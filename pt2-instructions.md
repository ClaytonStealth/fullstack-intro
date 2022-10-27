# Fullstack-Intro useEffect and fetch part 2

- _Approach_: Now that we have created our base application for fetching and displaying the blogposts, let's add query param functionality to our generated url so that we can use limit, page, sortBy and order to modify our query. Our final url should be something like:
  - https://62a8b06d943591102ba80fee.mockapi.io/blogs?limit=10&page=1&order=asc&sortBy=title
- _Reminder_: The limit param is a number that will limit the amount of results returned in a single API call. The page param is the current page of results that is returned to us from the API. The sortBy param is the property on each blog that we can sort the result by. The order param will be either asc or desc to make the sorted list of blogs return in ascending order or descending order.

## High Level Instructions

1. Creating the OptionBar

- _Approach_: We will create a react component called OptionBar that will hold our input fields and state variables for the options limit, page, sortBy and order.
- Create a new component called OptionBar.
- In OptionBar, create 4 new state variables:
  - limit, initialized to 10
  - page, initialized to 1
  - sortBy, initialized to ""
  - order, initialized to ""
- In the JSX of `<OptionBar/>`,
  - Add a label called Limit and a type="number" input field that sets the limit state variable. Additionally, this input field should have its value attribute set to limit.
  - Add a label called Page and a type="number" input field that sets the page state variable. Additionally, this input field should have its value attribute set to page.
  - Add a label called SortBy and a select field that sets the sortBy state variable with the following options:
    - An empty option as the default
    - An option with the value and display text of id
    - An option with the value and display text of title
    - An option with the value and display text of createdAt
  - Add a label called Order and a select field that sets the order state variable with the following options:
    - An empty option as the default
    - An option with the value and display text of asc
    - An option with the value and display text of desc

2. Generating URL Params

- _Approach_: Now that we have our input fields setup, we need to use those inputs to generate the parameter portion of our url inside of the useEffect function of `<App/>`. We will be creating a new function to generate the parameter string and set a new urlParamString state variable in the body of `<App/>`. We will then pass that generator function down as a prop into `<OptionBar/>` to update the urlParamString state variable every time a user updates one of the input fields.
- Add a new state variable to `<App/>` called urlParamString and initialize it to an empty string "".
- In the body of `<App/>`, create a new function called generateUrlParams with the parameters limit, page, sortBy and order.
  - This function should take these four parameters and create a query param string that will be concatenated onto our blogs fetch url. The param string should start with a question mark "?". Then for each parameter, concatenate the string {parameter-name}={parameter-value} onto the param string separated by an "&". Once you generate the query string in the function, set the state variable urlParamString to the generated query string. E.G. If limit = 5 and page = 2, the urlParamString state variable should be set to "?limit=5&page=2". If the limit = 4, page = 3, sortBy = createdAt and order = asc, the urlParamString state variable should be set to "?limit=4&page=3&sortBy=createdAt&order=asc".
- In the fetchBlogs async function, update the url passed into the fetch call to be: {urlEndpoint}/blogs{urlParamString}. This way, the urlParamString we generated will be automatically appended to our blogs API url.
- In the JSX of `<App/>`, add an instance of `<OptionBar/>` above `<BlogList/>` with the generateUrlParams function passed in as a prop to `<OptionBar/>`.

3. Implementing the useEffects

- _Approach_:
  - We have already created a useEffect in `<App/>` that will fetch our blogs on page load. Now we want to trigger this effect to run when our users enter a new value into any of our input fields. To do this, we will first set the urlParamString state variable as a dependency inside the useEffect dependency array.
  - This way, whenever the function generateUrlParams is called from `<OptionBar/>`, the urlParamString state variable will update with a new value and the effect function in the useEffect will be triggered, refetching our list of blogs with the updated query params.
  - Additionally, we will want a way of calling generateUrlParams inside of `<OptionBar/>` every time the user updates an input field. One way we could do this is to pass generateUrlParams into the onChange handlers of all of our input fields. But remember that useEffect is a way of "kicking off" some functionality as a response to some event. So instead, we will be creating a new useEffect in the body of `<OptionBar/>` that watches all the input state variables for changes and calls generateUrlParams in the effect function.
  - Thus once we have everything set up properly, we should be able to:
    - Update one of the input fields in `<OptionBar/>`
    - Which will then in turn trigger the useEffect of `<OptionBar/>`
    - Which will then call generateUrlParams
    - Which will then set urlParamString state to a new value
    - Which will then trigger the `<App/>` useEffect
    - Which will then call the blogs API
    - Which will then retrieve a new blog list
    - Which will finally update the blogs state variable to render our blogs to the page.
- In the dependency array of the useEffect in `<App/>` that is calling fetchBlogs, add urlParamString as an item.
- In `<OptionBar/>`, create a new useEffect. The effect function of this useEffect should call props.generateUrlParams with the state variables limit, page, sortBy and order passed as arguments. The dependency array for this useEffect should be watching the state variables limit, page, sortBy and order.
- If you implemented all of the above correctly, you should be able to change the input values in `<OptionBar/>` and have the displayed blog list update in real time.
  - _Note_: Due to the way the API works, limit and page must both have numerical values for either one to work; additionally, sortBy and order must both have proper string values in order for either one to work. I.E. For the API to recognize the value of the limit param, the page param must have a value as well. For the sortBy param, the order param must also have a value and vice versa.

## Expanded Instructions

1. Creating the OptionBar

- _Approach_: We will create a react component called OptionBar that will hold our input fields and state variables for the options limit, page, sortBy and order.
- In ./src/App.js, create a new component called OptionBar.
- In `<OptionBar/>`, create 4 new state variables along with their setter functions: [1]
  - limit with an inital value set to 10
  - page with an initial value set to 1
  - sortBy with an initial value set to ""
  - order with an initial value set to ""
- In the JSX of `<OptionBar/>`,
  - Add a label with the display value of Limit
  - Add a type="number" input field that has a value attribute equal to the limit state variable and an onChange handler that sets limit to the event value. [2]
  - Add a label with the display value of Page
  - Add a type="number" input field that has a value attribute equal to the page state variable and an onChange handler that sets page to the event value.
  - Add a label with the display value of SortBy
  - Add a select field with an onChange handler that sets the sortBy state variable to the event value. Additionally, add the following as options to the select field: [3]
    - An empty option as the default
    - An option with the value and display text of id
    - An option with the value and display text of title
    - An option with the value and display text of createdAt
  - Add a label with the display value of Order
  - Add a select field with an onChange handler that sets the order state variable to the event value. Additionally, add the following as options to the select field:
    - An empty option as the default
    - An option with the value and display text of asc
    - An option with the value and display text of desc

2. Generating URL Params

- _Approach_: Now that we have our input fields setup, we need to use those inputs to generate the parameter portion of our url inside of the useEffect function of `<App/>`. We will be creating a new function to generate the parameter string and set a new urlParamString state variable in the body of `<App/>`. We will then pass that generator function down as a prop into `<OptionBar/>` to update the urlParamString state variable every time a user updates one of the input fields.
- Add a new state variable to `<App/>` called urlParamString and initialize it to an empty string "".
- In the body of `<App/>`, create a new function called generateUrlParams with the parameters limit, page, sortBy and order. [4]
- Inside the function generateUrlParams, implement the following:
  - Create a new variable using let called urlParams that equals the string "?"
  - For each of the four function parameters limit, page, sortBy and order, concatenate four strings onto urlParams that each have the form {parameter-name}={parameter-value}. Each of these four strings should have the "&" symbol between them.
    - E.G. If limit = 5 and page = 2, the urlParamString state variable should be set to "?limit=5&page=2". If the limit = 4, page = 3, sortBy = createdAt and order = asc, the urlParamString state variable should be set to "?limit=4&page=3&sortBy=createdAt&order=asc".
  - Finally, call the setter function setUrlParamString with urlParams passed as an argument to set the state variable urlParamString to our generated urlParams string.
- In the fetchBlogs async function, update the url passed into the fetch call to be: {urlEndpoint}/blogs{urlParamString}. This way, the urlParamString we generated will be automatically appended to our blogs API url. [5]
- In the JSX of `<App/>`, add an instance of `<OptionBar/>` above `<BlogList/>` with the generateUrlParams function passed in as a prop to `<OptionBar/>`. [6]

3. Implementing the useEffects

- _Approach_:
  - We have already created a useEffect in `<App/>` that will fetch our blogs on page load. Now we want to trigger this effect to run when our users enter a new value into any of our input fields. To do this, we will first set the urlParamString state variable as a dependency inside the useEffect dependency array.
  - This way, whenever the function generateUrlParams is called from `<OptionBar/>`, the urlParamString state variable will update with a new value and the effect function in the useEffect will be triggered, refetching our list of blogs with the updated query params.
  - Additionally, we will want a way of calling generateUrlParams inside of `<OptionBar/>` every time the user updates an input field. One way we could do this is to pass generateUrlParams into the onChange handlers of all of our input fields. But remember that useEffect is a way of "kicking off" some functionality as a response to some event. So instead, we will be creating a new useEffect in the body of `<OptionBar/>` that watches all the input state variables for changes and calls generateUrlParams in the effect function.
  - Thus once we have everything set up properly, we should be able to:
    - Update one of the input fields in `<OptionBar/>`
    - Which will then in turn trigger the useEffect of `<OptionBar/>`
    - Which will then call generateUrlParams
    - Which will then set urlParamString state to a new value
    - Which will then trigger the `<App/>` useEffect
    - Which will then call the blogs API
    - Which will then retrieve a new blog list
    - Which will finally update the blogs state variable to render our blogs to the page.
- In the dependency array of the useEffect in `<App/>` that is calling fetchBlogs, add urlParamString as an item. [7]
- In the body of `<OptionBar/>`, create a new useEffect. The effect function of this useEffect should call props.generateUrlParams with the state variables limit, page, sortBy and order passed as arguments. The dependency array for this useEffect should be watching the state variables limit, page, sortBy and order. [8]
- If you implemented all of the above correctly, you should be able to change the input values in `<OptionBar/>` and have the displayed blog list update in real time.
  - _Note_: Due to the way the API works, limit and page must both have numerical values for either one to work; additionally, sortBy and order must both have proper string values in order for either one to work. I.E. For the API to recognize the value of the limit param, the page param must have a value as well. For the sortBy param, the order param must also have a value and vice versa.

## Code References

- [1]

```
const [limit, setLimit] = useState(10);
const [page, setPage] = useState(1);
const [sortBy, setSortBy] = useState("")
const [order, setOrder] = useState("")
```

- [2]

```
<label>Limit:</label>
<input type="number" value={limit} onChange={(e)=>{
	setLimit(e.target.value)
}}/>
```

- [3]

```
<option></option>
<option value="id">id</option>
<option value="title">title</option>
<option value="createdAt">createdAt</option>
```

- [4]

```
const generateUrlParams = (limit, page, sortBy, order) => {}
```

- [5]

```
const result = await fetch(
	`${urlEndpoint}/blogs${urlParamString}`
);
```

- [6]

```
<OptionBar
	generateUrlParams={generateUrlParams}
/>
```

- [7]

```
useEffect(() => {
	const fetchBlogs = async () => {
		...fetchBlogs code
	};
	fetchBlogs();
}, [urlParams]); // New item in the dependency array
```

- [8]

```
useEffect(()=>{
	generateUrlParams(limit, page, sortBy, order)
}, [limit, page, sortBy, order])
```
