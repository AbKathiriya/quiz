# Update - 3 Jan 2018

### 1. Backend integration

I have setup a test backend API at http://35.225.44.241:8000/banaquiz/api/quizzes/. 
Please help me see if you can integrate.

To access, first, obtain a JWT token by submitting a POST request to:

http://35.225.44.241:8000/auth-jwt/

with the following data in the message body:

```
{"username": "myfriend", "password": "atfiverr"}
```

Here's the equivalent CURL command:

```
$ curl --request POST \
      --url http://35.225.44.241:8000/auth-jwt/ \
      --header 'content-type: application/json' \
      --data '{"username": "myfriend", "password": "atfiverr"}'
```

You'll get back a token. Use that token to query the API, like so:

```
curl -H "Content-Type: application/json" -H "Authorization: JWT <INSERT TOKEN HERE>" -X GET http://35.225.44.241:8000/banaquiz/api/quizzes/
```

Example:

```
curl -H "Content-Type: application/json" -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6Im15ZnJpZW5kIiwiZXhwIjoxNTE0OTkwOTczLCJlbWFpbCI6IiJ9.yITL1isG1nPLLavk_5WqCU_GI_Xjm-5O_fgE_T3tWDo" -X GET http://35.225.44.241:8000/banaquiz/api/quizzes/
```


If the token expires, you can submit another POST request to get a fresh one (
I'll see if there's a simpler way to go about this).

Views available for queries:

1. Quiz thumbnail data

http://35.225.44.241:8000/banaquiz/api/quizzes/

You'll get back a JSON like this:

```
[
    {
        "id": 1,
        "category": "Fun",
        "title": "Are you smarter than a fifth grader?",
        "thumbnail": "http://35.225.44.241:8000/media/images/thumbnails/2Q_1.jpg",
        "date_created": "2018-01-03T08:34:10.394115+08:00"
    },
    {
        "id": 2,
        "category": "Personality",
        "title": "What is your color?",
        "thumbnail": "http://35.225.44.241:8000/media/images/thumbnails/images_50.jpg",
        "date_created": "2018-01-03T23:38:13.498367+08:00"
    }
]
```

2. Quiz details data

http://35.225.44.241:8000/banaquiz/api/quizzes/1/

Where the "1" at the end is the quiz "id".

You'll get back a JSON like this:

```
{
    "id": 1,
    "category": "Fun",
    "structure": "CorrectAnswer",
    "title": "Are you smarter than a fifth grader?",
    "thumbnail": "http://35.225.44.241:8000/media/images/thumbnails/2Q_1.jpg",
    "date_created": "2018-01-03T08:34:10.394115+08:00",
    "questions": [
        {
            "id": 2,
            "question_text": "What is my name?",
            "question_image": null,
            "answers": [
                {
                    "id": 4,
                    "answer_text": "Dolphin",
                    "answer_image": null,
                    "answer_value": "1"
                },
                {
                    "id": 5,
                    "answer_text": "Lion",
                    "answer_image": null,
                    "answer_value": "0"
                }
            ]
        },
        {
            "id": 1,
            "question_text": "What is 1 + 1?",
            "question_image": "http://35.225.44.241:8000/media/images/questions/images_9.jpg",
            "answers": [
                {
                    "id": 1,
                    "answer_text": "Must be 2",
                    "answer_image": null,
                    "answer_value": "1"
                },
                {
                    "id": 2,
                    "answer_text": "Don't know",
                    "answer_image": null,
                    "answer_value": "0"
                },
                {
                    "id": 3,
                    "answer_text": "Maybe 3",
                    "answer_image": null,
                    "answer_value": "0"
                }
            ]
        }
    ],
    "result_descriptions": [
        {
            "id": 2,
            "value": "2",
            "description": "You're top"
        },
        {
            "id": 1,
            "value": "1",
            "description": "Hmm... Can be better"
        }
    ]
}
```


FYI, There's another view, http://35.225.44.241:8000/banaquiz/api/detailed_quizzes/, 
which is basically a combined version of the 2 views above, but I don't think 
you'll be using it.

You can use a GUI tool like Postman for testing requests.


### 2. New quiz logic

I would like to have quizzes with no right or wrong answers as well. For this 
type of quizzes, the "answers" field looks like this:

```
"answers": [
                {
                    "id": 8,
                    "answer_text": "rice",
                    "answer_image": null,
                    "answer_value": "pink"
                },
                {
                    "id": 7,
                    "answer_text": "steak",
                    "answer_image": null,
                    "answer_value": "green"
                },
                {
                    "id": 6,
                    "answer_text": "oatmeal",
                    "answer_image": null,
                    "answer_value": "pink"
                }
            ]
```

As you can see, each answer has a displayed value ("answer_text") and an 
inherent value ("answer_value"). As user goes through the quiz, we simply count 
the number of times a certain number of "answer_value" is selected. The 
"answer_value" with the most number of selection at the end of the quiz will be 
the quiz result. We will display the accompanying text for the winning 
"answer_value". Here's an example of the result descriptions:

```
"result_descriptions": [
        {
            "id": 4,
            "value": "green",
            "description": "You must be green!"
        },
        {
            "id": 3,
            "value": "pink",
            "description": "You're pink"
        }
    ]
```

So if the most selected "answer_value" is "pink", the accompanying text will 
be "You're pink". If there's a tie, just pick any.

To distinguish between those 2 types of quiz, I added in a field "structure" 
with 2 possible values: "CorrectAnswer" and "NoCorrectAnswer". Please process 
"NoCorrectAnswer" quiz according to the logic above.

As for the current "CorrectAnswer" type of quiz, I made some changes to re-use 
the same data structure as "NoCorrectAnswer" type. The "answers" portion now 
looks like this:

```
"answers": [
                {
                    "id": 3,
                    "answer_text": "Maybe 3",
                    "answer_image": null,
                    "answer_value": "0"
                },
                {
                    "id": 2,
                    "answer_text": "Don't know",
                    "answer_image": null,
                    "answer_value": "0"
                },
                {
                    "id": 1,
                    "answer_text": "Must be 2",
                    "answer_image": null,
                    "answer_value": "1"
                }
            ]
```

Please take the answer with the "answer_value" of "1" as the correct answer. 

As for the "result_descriptions", it now looks like this:

```
"result_descriptions": [
        {
            "id": 2,
            "value": "2",
            "description": "You're top"
        },
        {
            "id": 1,
            "value": "1",
            "description": "Hmm... Can be better"
        }
    ]
```

Now the description with the smallest "value" (its raw form is string) 
corresponds to the lowest score bracket, the one with the 2nd smallest "value" 
corresponds to the 2nd lowest score bracket, and so on. I understand this is 
less straightforward than before, so please let me know if you have concerns.


### 3. Others

I renamed some fields for readability.

For the "Load more quizzes" button, can we fetch in batches of 2 thumbnails 
per click?

There's a fied "date_created". Please display quizzes in chronological order, 
latest on top (for that content category).

In terms of content, there're now 3 categories: "IQ", "Personality" and "Fun". 
Please help me display "Fun" section as well (but I assume you're already 
doing it programmatically?).