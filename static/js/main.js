window.addEventListener('DOMContentLoaded',(event)=>{
    console.log('DOM fully loaded and parsed')

    var divContainer = $('.inputContainer')
    var args, kv, u_kv, u, kv_initial, q, g = []

// resets the input line
    $('#numterms').val('')

// listens for input n for number of list items to be populated
    const n = document.querySelector('#numterms')
    n.addEventListener('change',()=>{
        console.log('change')
        emptyInputContainer()

        const numterms = parseInt(n.value)
        console.log(numterms)

// create input lines in response to n
        for(i=0; i< numterms; i++){
            createInputLine()
        }
    })

    const bg = document.querySelector('.btnguess')
    bg.addEventListener('click', guessKey)

    bg.addEventListener('mouseover', showGuessed)
    bg.addEventListener('mouseout', hideGuessed)

    const bs = document.querySelector('.btnsubmit')
    bs.addEventListener('click', submitUserInput)

// on mouse over guess button, guessed list is shown
    function showGuessed(){
        $('.guessedList').show('slow')
    }

// on mouse out guess button, guessed list is hidden
    function hideGuessed(){
        $('.guessedList').hide('slow')
    }

// clears the string of correctly guessed words
    function clearGuessed(){
        $('.guessedList').html('')
        g = []
    }

// display subject title
    function displaySubject(){
        let s = $('.inputSubject')
        $('.subject').html(s.val())
        s.hide()
    }

// hides subject title and shows input entry
    function resetSubject(){
        let s = $('.inputSubject')
        $('.subject').html('')
        s.show()
    }

// This function starts off by requesting the server for a random question. Manages client interface
    function submitUserInput(){
        console.log('submit user input')

        clearGuessed()
        readData()
        getQuestion()

        $('.guess_section').toggle("slow")
        $('.data_section').toggle("slow")
        // $('.data_section'),hide()
        if ($('.btnsubmit').text() == 'start'){
            displaySubject()
            $('.btnsubmit').text('stop')
            $('.btnguess').show('slow')
            $('.result').html("Let's begin!")
            $('.result').show('slow')
            $('.inputGuess').val('')

            $('.btnsubmit').hide('slow')
        } else {
            resetSubject()
            $('.btnsubmit').text('start')
            $('.btnguess').hide('slow')
            $('.result').hide('slow')
        }


    }

    function emptyInputContainer(){
        const p = document.querySelector('.inputContainer > ol')
        p.innerHTML = ''
    }

// can use jQuery instead. This is just an exercise using plain Javascript
// Create input lines for entering key value pair of answer question set
    function createInputLine(){
        let l = document.createElement('li')
        let lc = document.createAttribute('class')
        lc.value = 'keydefClass'
        l.setAttributeNode(lc)

        let c = document.createElement('input')
        let ct = document.createAttribute('type')
        ct.value = 'text'
        c.setAttributeNode(ct)
        let cn = document.createAttribute('name')
        cn.value = 'somename'
        c.setAttributeNode(cn)
        let cc = document.createAttribute('class')
        cc.value = 'keyClass'
        c.setAttributeNode(cc)
        l.appendChild(c)

        c = document.createElement('input')
        ct = document.createAttribute('type')
        ct.value = 'text'
        c.setAttributeNode(ct)
        cn = document.createAttribute('name')
        cn.value = 'somename'
        c.setAttributeNode(cn)
        cs = document.createAttribute('size')
        cs.value = '50'
        c.setAttributeNode(cs)
        cc = document.createAttribute('class')
        cc.value = 'defClass'
        c.setAttributeNode(cc)
        l.appendChild(c)

        p = document.querySelector('.inputContainer > ol')
        p.appendChild(l)

    }

// This function sends a server request data containing user answer and array/map of question/answer. It removes a correctly answered question from the array/map.
    function guessKey(){
        console.log('guessKey')

        u = $('.inputGuess').val()

        bundleData()

        $.getJSON($SCRIPT_ROOT + '/_guess', args, function(data){
            if (data.result["a"] == 'correct') {
                console.log('correct!')
                // pop kv
                kv = kv.filter(function(el){
                    // not case sensitive
                    return el.k.toUpperCase() != u.toUpperCase()
                })
                // save guessed words
                g.push(u)
                console.log('g = ', g)
                let gs = 'Guessed: ' + g.join(', ')
                $('.guessedList').html(gs)
            } else {
                console.log('incorrect.')
            }

            console.log('kv.length: ' + kv.length)
            if(kv.length == 0) {
                $('.btnguess').hide('slow')
                $('.result').html('Well Done!')

                $('.btnsubmit').show('slow')
            } else {
                $('.result').html(JSON.stringify(data.result["a"] + '. ' + kv.length + ' more to go'))
                getQuestion()
            }
        })
    }

// Bundles up data to send to python server. Server receives request.args with ImmutableMultiDict type
    function bundleData(){
        u_kv = {}
        u_kv['u'] = u
        u_kv['k'] = kv
        // args = u_kv

        u_kv_q ={}
        u_kv_q['u'] = u
        u_kv_q['k'] = kv
        u_kv_q['q'] = q
        args = u_kv_q
    }

// collect input data into and array
    function readData(){
        kv = [];
        $('.inputContainer li').each(function(i, li) {
            $(li).map(function(){
            var k= $(this).find('.keyClass').val()
            var v= $(this).find('.defClass').val()
            kv.push({k,v})
          })
        });
        // store initial array/map
        kv_initial = Object.assign({}, kv)
    }

// Function to get Question from python server which randomly picks one and returns to client
    function getQuestion(){
        console.log('getQuestion...')
        console.log(kv)

//  kv is an array of json values i.e. [{k : 'qwe', v : '123'}, {k : 'qwe', v : '123'}] kv[0]={k : 'qwe', v : '123'}
        args = {}
        args['kv'] = kv
        // args = kv   //[0]
        // {a:"1",b:"2"}
        $.getJSON($SCRIPT_ROOT + '/_get_question', args, function(data){
            console.log('getQuestion *****')
            console.log('getQuestion ' + data.question)
            q = data.question
            q == "" ? $('.question').html(''):$('.question').html(JSON.stringify(q))
        })
    }

    // create first line
    createInputLine()

})
