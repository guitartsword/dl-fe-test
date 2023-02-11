# Questions

## 1. What is the difference between Component and PureComponent? give an example where it might break my app.
I have some experience working with class Components, so my guess will be that PureComponents are similar to
pure functions in that they are provided some props and they render the same html with the props provided. PureComponents
don't change their state as a normal `Component` would and thus making them behave different when rendering.

I may think that a PureComponent wont re-render the same as a Component which will cause unexpected behavior

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
I may think that there are two ways of managing state re-renders and they may clash with each other

## 3. Describe 3 ways to pass information from a component to its PARENT.
* using a global state (context, redux)
* using function that triggers event and send the data through arguments.
```tsx
function Parent() {
    return <Counter onClick={(childData) => {
            // Child component pass information to its parent here
            // using the arguments passed to the onClick event
            console.log(childData);
        }}
    />
}

function Counter(props: any) {
    const [count, setCount] = React.useState(0);

    const handleClick = () => {
        setCount((prevValue) => {
            
            return prevValue + 1
        })
    }

    return <>
        <button onClick={() => props?.onClick?.(count)}> Send count to parent</button>
        <button onClick={handleClick}>Count</button>
    </>
}

```
* assigning a function to an object that returns the child data when called.

```tsx
function Parent() {
    const mutableObject = {}
    return <>
        <Counter getCount={mutableObject}/>
        <button onClick={() => {console.log(mutableObject.getCount())}}>Fetch child data</button>
    </>
}

function Counter(props: any) {
    const [count, setCount] = React.useState(0);

    props.mutableObject.getCount = () => {
        return count
    }
    const handleClick = () => {
        setCount((prevValue) => {
            
            return prevValue + 1
        })
    }

    return <>
        <button onClick={handleClick}>Count</button>
    </>
}
```

This last way of doing it is a weird way of working out this problem, it definitely is not "The React Way", but it works.
I believe that using a mutable object has problems with reactivity and thus making components not re-render, but in this case
it wont make any difference, since what is mutating is the function call and not a data the will render or must render on change.

## 4. Give 2 ways to prevent components from re-rendering.
* Using memo
* not updating state or props.
* mutating the object directly as explained on the last way of question 3.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.
* Fragment is a react component that doesn't create an element in the DOM after rendering.
* We need it to create components without unnecessary wrappers that may break the css like when using flex.
* Not using fragments may break the html semantics, like when using a HTML table and want to render more than one row in a single "component", and is needed that table rows direct parent is a able
* If you want to render a component with two childs, then it will give an error that components should have a single root.
```tsx
function Breaks() {
    return (
        <p>Line 1</p>
        <p>Line 2</p>
    )
}

function WorksWithFragment() {
    return <>
        <p>Line 1</p>
        <p>Line 2</p>
    </>
}
```

## 6. Give 3 examples of the HOC pattern.
* Redux uses it enhance components by passing states and actions
* Mobx uses it to create make the mobx class `reactive` so when using it in a react component it will trigger a re-render
* It can be used to `compose` components and follow the composition pattern that is common in functional language.

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.
* Promises exceptions are handled through the .catch method
```ts
Promise.resolve(123)
  .then(res => doSomething(res))
  .catch(error => handleError(error))
```
* async functions that dont use promises, usually receives a parameter for a callback that executes after the function ends,
this callback usually receives an error as argument
```ts
fs.writeFile('/path', 'contents', (err) => {
    if (err) {
        handleError(err)
        return
    }
    doSomethingAfterWritingFile()
})

```
* Async/Await throws an error so a try/catch can be used, but since they are promises,
you can silently ignore the error with the .catch method
```ts
async function normal() {
    return 'working'
}

async function testWithTryCatch() {
    try {
        const data = await normal()
        doSomething()
    } catch (error) {
        handleError(error)
    }
}

async function testWithPromiseCatch() {
    const data = await normal().catch((error) => new Error(`Failed with error: ${error}`))
    if (data instanceof Error) {
        handleError(data)
        return
    }
    doSomething(data)
}

```

## 8. How many arguments does setState take and why is it async.
* It takes different arguments, it can be a function or value. In case of the function it receives a previousValue and must return the newValue.
* It is async because this is the way the core react developers decided the state should work. When you set a new state, the value hasn't changed because the render hasn't been done yet, once the render is done, then you have access to the updated state.

## 9. List the steps needed to migrate a Class to Function Component.
This is what I would do, probably is not a detailed and complete walkthroug, but I think this will be a good starting point.

1. Change Class to function
2. The return value of the function should be the same as in `render()` method
3. Create a `const [state, setState] = useState({})` to temporarly migrate `this.state`
4. Change all `this.state` to just `state`
5. Change all `this.setState` to just `setState`
6. Change `this.props` to just `props`
7. Create functions inside the Functional Component that will replace the existing component methods
e.g. (replace `handleClick(){/*Code*/}` to `const handleClick = ()=>{/*Code*/})`
8. Replace all the `this.<methodName>()` to just `<functionName>()`. e.g. (replace `this.handleClick` to just `handleClick`)

## 10. List a few ways styles can be used with components.
* Like normal CSS (inline or using class, but in react is called className)
* With StyledComponents or Emotion, creating new components that just have styles
```tsx
const Button = styled.button`
border: 1px solid gray;
padding: 4px;
background-color: white;
outline: none;
// MOre css here
`
* Using preprocessor css like Sass or Less.
* Using css modules like how they are used in these repository (Check this file: `src\components\AutoComplete\AutoCompleteResults.tsx`)
```

## 11. How to render an HTML string coming from the server.
There is a prop in html tags supported by react calle `dangerouslySetInnerHTML`. This prop can be used directly from the server,
the server should sanitize this html, but the frontend can also sanitize the html.
