# CRA template using atomic design

Table of contents

- [Motivation](#motivation)
- [Usage](#usage)
  - [Atoms](#atoms)
  - [Molecules](#molecules)
  - [Organisms](#organisms)
  - [Templates](#templates)
  - [Pages](#pages)
  - [Conclusion](#conclusion)
- [Further differences...](#further-differences)
  - [npm scripts](#npm-scripts)
    - [`npm run lint`](#npm-run-lint)
    - [`npm run prettify`](#npm-run-prettify)
  - [Config driven head section](#config-driven-head-section)
    - [Limitations](#limitations)
    - [Why bother at all? We have react-helmet!](#why-bother-at-all-we-have-react-helmet)
  - [Uses a helper component "Layout"](#uses-a-helper-component-layout)
  - [CSS only themes](#css-only-themes)

This template is based on the default [cra-template](https://create-react-app.dev/). Please find the original documentation [here](./README.org.md)

# Motivation

I created this template to enable a "pre-defined way" to structure a React app.

As you will know, the way you organize your components, when creating a React app, is up to you. So lot's of people I know, seem to always start a new React project with the following question(s):

> What should be the folder structure, how should it help me organize my project and keep coding as convenient as possible?

So my decision - with the template I created here - is to simply define **how components _play_ together** and have the folder structure, **derive from that definition**. And here is where the **Atomic design pattern** comes into play.

[Atomic Design](https://atomicdesign.bradfrost.com/table-of-contents/) defines exactly that (and much much more), but to be able to answer the question "how to organize my React project", it is so far sufficient to adopt the concept of:

- atoms
- molecules
- organisms
- templates
- pages

This "adoption" does not only define, what folder structure to create. It actually also tells you, when to create what (in sense of type). But for sure [Atomic Design](https://atomicdesign.bradfrost.com/table-of-contents/) is a high level concept and has nothing to do with React itself.
So even with [Atomic Design](https://atomicdesign.bradfrost.com/table-of-contents/), we need to define some rules. Yes, you'll see. Start a debate with your favorite team-mates and you will figure: Each team-mate has it's own opinion when a component is a molecule or an organism.

# Usage

As stated before, IMO, we cannot only apply the **Atomic design pattern** to a folder structure and we are done.

You need to clearly communicate with all team-mates, how we want to use this concept in a React app (the team is developing).

If you don't do that, you will most likely end up in long discussions about "what type a component is" instead of developing exactly the one, you are talking (or fighting) about.

So here are **my** usage-rules, that I want to follow ;)

One thing before you continue reading. The next sections will not explain what **Atomic Design** is, only how **Atomic Design** applies to the folder structure I created here and how I want to use it.
A good understanding of **Atomic Design** can be learned here [Atomic Design](https://atomicdesign.bradfrost.com/table-of-contents/)

## Atoms

This folder only exists for the sake of completeness.

From my idea, how I want to apply **Atomic Design** to a React app, this folder is not to be used for any component

According to my preferred reference about [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/):

> **Atoms** are the basic building blocks of all matter. Each chemical element (atom) has distinct properties, and they can’t be broken down further without losing their meaning.

Following this idea makes each HTML element an atom or not?

Let's take the `a` element. It has properties like `href` and I would not know about a way to break an `a` element further down.

(perfect place for some lint rule, that fires, if a code line reads "import from './components/atoms'" ;))

## Molecules

This folder is used for any component that consists of more than one HTML element (what I consider an **atom**)

- like an `input` element with a `label`

```
<label for="field">label</label>
<input id="field"/>
```

- but also an element enclosed by an element

```
<div>
    <h1>Title</h1>
</div>
```

## Organisms

This folder is used for any component that consists of more than one **molecule**.
Or as soon as the component:

- needs to import more the one component from the **molecules** folder
- or you need to use one imported **molecule** several times

then you are creating an **organism**

Think of a form that imports several **molecules** like `Input`, `Selector` and `Checkbox`. The form itself, which is using all these **molecules**, will become an **organism**.

```
import Input from "../molecules/Input"
import Selector from "../molecules/Selector"
import CheckBox from "../molecules/CheckBox"

<form>
  <Input />
  <Selector />
  <CheckBox />
</form>
```

Or you may need a section header that should display a title and a subtitle. Here you would import a **molecule** like `Title` and most likely invoke it differently.

```
import Title from "../molecules/Title"

<div>
  <Title type="h1" />
  <Title type="h2" />
</div>
```

## Templates

This folder is used for any component that combines **organisms** and **molecules** to define a structured way to represent them. Basically here you create all components that define a layout, a 'way' how your **organisms** and **molecules** should be displayed (rendered).

Let's say we have a from (organism), title with a subtile (organism) and one link (molecule). All there components can now be combined to a `<section>`, which will become the **template**

```
import LoginForm from "../organisms/LoginForm"
import TitleWithSubTitle from "../organisms/TitleWithSubTitle"
import Link from "../molecules/Link"

<section>
  <TitleWithSubTitle
     title="Welcome"
     subtitle="Please enter your account data, to login"
     />
  <LoginFrom />
  <Link
     text="or register here"
     href="/register"
    />
</section>
```

## Pages

This folder is used for any **page** you create. So a **page** is the final product that combines several **templates**.

Let's look at a typical scenario. You created the **templates** `Header`, `LoginForm` and `Footer`. Now you can combine these **template** to create for instance your **page** `Login`.

```
import LoginForm from "../organisms/LoginForm"
import Header from "../templates/Header"
import Footer from "../templates/Footer"

<section>
  <Header {...props} />
  <LoginFrom />
  <Footer {...props} />
</section>
```

## Conclusion

After I had created all folders (that hold components) my folder structure looks like this:

```
.
├── components
│   ├── atoms
│   ├── molecules
│   ├── organisms
│   ├── pages
│   └── templates
```

# Further differences...

...to the original cra-template

## npm scripts

I added two more npm scripts

### `npm run lint`

Calls eslint and checks you code

### `npm run prettify`

Calls prettify to keep code formatting consistent.

## Config driven head section

One thing we all have to deal with, is the head section of our `index.html`. We want to set some title, add meta keys or other things.
And the answer to all this is [react-helmet](https://github.com/nfl/react-helmet).

While creating this cra-template I was thinking, is it really the only way or do I only use it, because it is all so convenient?

So what could be another approach, what works without [react-helmet](https://github.com/nfl/react-helmet)?

Why not use an `index.ejs` template, feed it with some JSON data (ex. a config.json) and generate the required `index.html`.

So i did and I added another npm script

- `npm run preIndex`

Creates `public/index.html` from the template `src/assets/index.ejs` and incorporates data from `public/config.json`.

This script has been added to the `start` script and as a `preBuild`. So whenever you build your app or run the dev server, `index.html` is re-created.

### Limitations

As you may have read, the `index.html` is written, when you start your dev server. During runtime it cannot be changed (on the fly). So if you need to manipulate the `<head>` section of you app in a dynamic way, this approach, cannot be applied.

### Why bother at all? We have react-helmet!

This is true and react-helmet does a perfect job. But for my use case, I don't see, when I need to change the `<head>` section again.
The information I want to store in the header is once set and very likely never touched again.

So this is my use case and here is what the **Code Coverage** tab of **Google Chrome** reads, when I use helmet or the template approach.

- With helmet:

  `88.5 kB of 153 kb (58%) used so far, 64,3 kB unused`

- Without helmet:

  `69,4 kB of 135 kb (51%) used so far, 66.0 kB unused`

The React app has grown by almost 20 kB.

## Uses a helper component `Layout`

This helper is used to force each component to follow layout specific properties (like for instance width and height). This helps, when fighting cumulated layout shifts (CLS) ;)

While being such a key component (as I said, all templates should use this helper!) I want to enable lot's of other styling aspects with this component.

Here is a list of things that actually emerged, by adding the helper **Layout**:

- a CSS framework (bootstrap in my case) is added to provide layout functionality (like the CSS grid)
- a method "how to keep the CSS framework as small as possible" has been evaluated and integrated. Simply check where I load `scss` files and how bootstrap is only used, for what the component needs.
- the component will also provide the styles needed for `screen` and `print` representation of the CRA

## CSS only themes

Another thing we always find today in React apps is a theme switcher. And yes also this feature is implemented with several React modules.

My approach is to only use plain CSS (through SaSS) and provide a button to switch the theme. Check the default page (yes think **atomic**) to find how I implemented the theme switch.
