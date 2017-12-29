# Overview

This is a mobile-first, responsive page. As you can see from the attached
mockup, the user experience is straightforward:

- From the homepage, users will see the logo, the search bar, and an arrow
pointing downward (page 1).
- As they *scroll* down, they will see a list of IQ & personality quizzes.
There're only 4 per category displayed; if they click "More quizzes", they
will see all the quizzes for that category (page 2).
- When users click on a quiz, they will be taken to the quiz page
(page 3 - 6). After they complete the quiz, they will be presented with more
quizzes from the same category at the bottom.

# Component requirements

Please use styled-components if possible, since I'd like it to be as resusable
as possible. Please create presentational components as you see fit, just pay
attention to these 2 components in particular:


1. The quiz thumbnail component

These are the thumbails you see in page 2. On page load, use a container
component to query the backend API. Use the returned JSON to generate
thumbnails. For now, please just use the attached JSON
"sample_thumbnail.json" as the returned input. I'll hook it up to a real
backend API later.

The JSON file looks like this:

    ```
    {
        "quiz_title": "Are you smartest among friends?",
        "quiz_image": "path/to/image",
        "quiz_id": 12345
    }
    ```

    "quiz_title" and "quiz_image" are used to generate the thumbnail, as seen
    in the mockup. "quiz_id" is used to determine which quiz to render when
    user clicks on the thumbnail.


2. The quiz component

This is the main thing. Again, the content is also fetched via JSON. For now,
please just use the attached "sample_quiz.JSON" file.

Couple of things to note:

- The first thing user see (after clicking on a thumbnail) is the intro page.
It has a title, a body text, and a "START" button. After user clicks on the
"START" button, they will go through all the questions of that quiz.
- For each question, it may or may not have an image (if the
"question_imgage" field is empty, there's no image).
- For each answer, similarly, it may or may not have an image.
- For each quesiton, only 1 answer has the value "correct_answer" of 1. Please
keep track of this to display the final result.

Not sure if you're familiar with this, but I come across this example for how
to render a quiz sequentially using raw JavaScript:

https://www.sitepoint.com/simple-javascript-quiz/

But feel free to use whatever logic you like :)

For displaying result, it's a little tricky. I want to display a text to
accompany the result, so here's the rule:

- First, convert the score to a 100% scale.
- Second, look at the "quiz_result" field of the JSON object
(in the "sample_quiz.JSON" file). If it has 4 elements, split the score range
into 4 even brackets (i.e. 0% - 25%, 26% - 50%, 51% - 75%, 76% - 100%). If it
has 3 elements, split the score range into 3 even brackets, and so on.
- After you have determined the bracket for the score, retrieve the
corresponding text description (first element of the array corresponds to
the first bracket, second element corresponds to the second bracket, and so
on).

# Others

For other components, please feel free to code the logic based on the mockup
visual (e.g. the "START AGAIN" button at the end should bring user back to
the quiz intro page).

Please make the frontend as complete as you can, together with React Router
and stuff. Feel free to install whatever npm packages you need. Documentation
is very welcomed :)
