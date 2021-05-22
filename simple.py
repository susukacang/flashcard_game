import random, json
from flask import session

# kv = {'a': 19, 'b': 21, 'c': 23, 'd': 25}
# n = len(kv)
# for i in range(n):
#   k = input('Key: ')
#   v = input('Value: ')
#   kv[k] = v


def userInput():
  kv={}
  n = int(input('How many terms? '))
  for i in range(n):
    k = input('Key: ')
    v = input('Value: ')
    kv[k] = v
  print(f'Your dictionary => {kv}')
  return kv

# Computes
def compute(kv):
  while kv != {}:
      r = k, v = random.choice(list(kv.items()))
      print(r)
      # print(k)
      # print(v)
      print(f'Clue: {v}')
      u = input('Guess the key? ')
      if u == k:
          print('correct')
          kv.pop(k)
      else:
          print('incorrect. regenerate...')
      # print(kv)

# Play game
def playGame():
  play = True
  while play:
    kv = userInput()
    compute(kv)
    a = input('Play again? (Y/y) ')
    if a != 'y' and a != 'Y':
      play = False


def playGameWeb(u_kv_q):
    # compute(kv)
    try:
        print(f'debug info playGameWeb u_kv_q ' + str(u_kv_q))
        # print(f'debug info playGameWeb q ' + str(q))

# convert ImmutableMultiDict to MultiDict (mutable)
        p = u_kv_q.copy()
        u = p.pop('u')
        q = p.pop('q')

        print(f'debug info playGameWeb u ' + u)

# create pv iterator
        pv = p.values()
        kv={}
        while True:
            try:
                key = next(pv)
                kv[key] = next(pv)
                print(kv)
            except StopIteration:
                break

        print(f'debug info playGameWeb kv.items() ' + str(kv.items()))

# pick k from kv based on q
        for k, v in kv.items():
            print(f'u={u}, _k={k}, q={q}, _v={v}')
            # case-insensitive
            if u.upper() == k.upper() and q == v:
                a = "correct"
                print(f'correct')
                return {"a": a}

        a = "incorrect"
        print(f'incorrect')
        return {"a": a}

    except Exception:
        return "exception..."

def pickQuestion(kv):

    # kv is a dictionary
    print(kv)
    r = k, v = random.choice(list(kv.items()))
    print(f'debug info pickQuestion r ' + str(r))

    return v


if __name__ == '__main__':
  playGame()