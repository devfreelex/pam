# **PAM JS**

 PAM is a set of simple programming patterns combined to promote the construction of reactive web applications.

 PAM deals directly with the application interface by promoting simple es6 + code, making it easy to create components, directives, validators, data filters and any other type of component, always using vanilla javascript.

 The idea behind PAM is that it can help us write simple, clear code with no hidden black magic that enforces standards like OO, MV *, Observable, PUB / SUB and always using the minimum code possible.

With the advancements of the JavaScript language (ECMA SCRIPT), many of the dependencies required to provide browser compatibility and resource support are no longer so necessary. Therefore, PAM is written 100% using ES6 +.

> Now be careful if you develop a system to put into production, because the micro-library is still in the first stage of development and may contain unidentified bugs.

## Introdution

To get started with PAM, you need to know the basics of OO (OBJECT ORIENTATION). So you still have not got it, study a little more about it and come back here later.

Below we have the basic structure of an app built with PAM.

```
src
|---assets
|-----global.css
|-----reset.css
|
|---core
|---components
|-----your componts
|
|---directives
|-----your directives
|
|---services
|-----your services
|
|---helpers
|-----your helpers
|
|---validators
|-----your validators
|
|---store
|-----index
|-----state
|-----actions
|-----mutations
main.js
index.html
```