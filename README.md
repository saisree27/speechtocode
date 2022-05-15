![Logo](GithubImages/Logo.png)

## Inspiration

- Saigautam Bonam
- Kinshuk Phalke
- Nicolas Cai
- Dhruv Sharma

## Inspiration

When brainstorming for our project idea, we were looking to give beginning programmers a way to learn the syntax and coding fundamentals of new programming languages – a way for anyone to get involved with and quickly learn programming.

Access to AssemblyAI inspired us to use speech as an input to help beginner coders turn English phrases and ideas into code. We believe this is a super effective way to teach users programming syntax and coding fundamentals.

## What it does

Ever start learning a language and give up after Hello World? Speech2Code is here to change that!

Think of Speech2Code as training wheels you never had. Every language is virtually the same, so why spend hours and hours pouring over learning a new one? With Speech2Code simply say what you want to do and get it done almost as efficiently as a senior dev. With Speech2Code you no longer need to do System.out.println to get something printed to the console, just say print and get it done! We’ve implemented a new meta language that lets you talk in high level terms, the lines of a program, and watch them appear as quickly as you can C.

Want to learn more? Head to the tutorial. Better hop on quick, before the next script kiddie overtakes your productivity!

## How we built it

We built the frontend of the application using React and built the back-end using a Python flask server for the AssemblyAI API integration and Express.js for our code compilation.

The backend was made in Python and used some filtering to achieve a meta language that was then tokenized and parsed into a class abstraction that served as a language agnostic generating platform. This was then evaluated using a visitor pattern, which returned the code line we needed.

## Challenges we ran into

We had three main challenges that we ran into. Firstly, embedding a code editor into the website and supporting syntax highlighter for each code editor proved to be awkward in actually integrating and formatting to work on our website visually. We ended up adding a toggle to switch between an edit mode (the Monaco editor) and non-edit mode (the syntax highlighting).

We also had some challenges integrating express.js into our project, including figuring out how to create the post request in a way that aligned with the format of our input and working with the limitations of the open-source compiler API (CodeX) we used to run the code on our website.

Finally, when generating code, we faced problems with trying to indent the code based on previous lines, especially for Python, since it’s not easy to tell that a code block is finished (unlike Java/JavaScript which use curly braces).

## Accomplishments that we're proud of

We’re proud of creating a nice, consistent UI aesthetic across all three of our pages, especially given our limited experience with CSS design. We were also able to translate a wide range of user inputs into code and support a lot of the basic functionality of each language we included, which was the goal we wanted to reach by the end of this hackathon.

## What we learned

- Since some of us had minimal front-end experience, our heavy use of React (and to an extent, HTML, CSS, JS) for our project proved to be a great learning experience in UI/UX design.
- It was also our first time integrating APIs like AssemblyAPI and the Axios API in our website for the purposes of language interpretation and compilation, and it was satisfying to see each component work hand-in-hand.
- Meta-Languages, Class Abstractions, Visitor Patterns

## What's next for Speech2Code

Moving forward with Speech2Code, we hope to add further support for more languages and frameworks, much like other online compiler websites. Additionally, we hope to implement some kind of type Inference system, like Hindley-Milner Extension for imperative languages, and semantic similarity for reducing words closer to the meta language.


### Images
![Landing Page](GithubImages/Landing.png)
![Speech2Code Tool Page](GithubImages/Speech2CodeTool.png)
![Tutorial Page](GithubImages/Tutorial.png)
