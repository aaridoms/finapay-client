
# FinaPay

## [See the App!](https://finapay.netlify.app/)

![Alt text](src/assets/finapayLogoSinFondo.png)

## Description

Pay and expenses manager. Also with an investment option
#### [Client Repo here](https://github.com/aaridoms/finapay-client)
#### [Server Repo here](https://github.com/aaridoms/finapay-server)

## Backlog Functionalities

-Searching Users by a secret code and frequents transactions
-Implement real money with a pay platform.
-More charts filtering expenses with more accurace.
-Mobile app port.

## Technologies used

HTML, CSS, TailwindCss, Next Ui, Javascript, Vite, React, React Context, React device detect, Nodemailer, axios, chart.js, framer-motion, moment.

# Client Structure

## User Stories



- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **home** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **summary** - As a user I want to see a summary of my money, my latest transactions and expenses. Also be able to deposit money and make a transaction to the list of users
- **expenses** - As a user I want to add new expenses, search by category, view their details, edit and delete them. Additionally, view a graph of my expenses ordered by categories
- **invesment** - As a user I want to see all the options that the page offers me to invest. I can choose the detailed options I like best and join them. Additionally, I want a history of my last transactions and see how much I have won or lost in each of them.

## Client Routes

**NOTE -** Use below table to list your frontend routes

## React Router Routes (React App)
| Path                      | Page            | Components        | Permissions              | Behavior                                                      |
| ------------------------- | ----------------| ----------------  | ------------------------ | ------------------------------------------------------------  |
| `/`                       | Home            |                   | public                   | Home page with a login modal                                                     |
| `/signup`                 | Signup          |                   | public     | Signup form, link to login, navigate to homepage after signup |
| `/account/summary`        | Summary         |TransactionForm, AddFunds, ChartBar  | user only `<IsUserActive>`  | View summary of funds, transactions, expenses. Send money and deposit money  |
| `/account/profile`                | Profile |      | user only `<IsUserActive>`  | Profile page with your info. You can also change your email and profile picture.          |
| `/account/expenses`             | Expenses        |  ExChart, ExpenseForm  | user only `<IsUserActive>`  |Page with your expenses, where you can add new ones, search by categories and delete.                                  |
| `/account/expenses/:idExpense/details`             | ExpensesDetails       |  ExpenseForm               | user only `<IsUserActive>`  | View the details of one of your expenses. Besides, you can edit and delete it.backlog                                    |
| `/account/investment`       | Investment   | AddInvestment, NewInvestment          | user only `<IsUserActive>`  | Shows the investment options you can join. You also have a list with your latest transactions

## Other Components

- Navbar
- NavbarUser
- NavBarUserMovile
- Footer
- Visual Components
--EyeFilledIcon
--EyeSlashFilledIcon
--ListboxWrapper
--LockIcon
--MailIcon

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.verify()

- Backlog Service
  - funds.add(id)
  - investment.add(id)
  - investment.join(id)
  - expenses.add(id)
  - expenses.edit(id)
  - expenses.details(id)
  - expenses.delete(id)
  - expenses.filter(id)
  - transaction.add(id)
  - summary.view(id)
  - profile.view(id)
  - profile.editEmail(id)
  - profile.editPic(id)
  
- External API
  - currencyApi.details
 
  
## Context

- auth.context

  
## Links

### Collaborators

[Developer 1 Ángel Arias](https://github.com/aaridoms)

[Developer 2 Sergio Puyod](https://github.com/SergioPYD)

### Project

[Repository Link Client](https://github.com/aaridoms/finapay-client)

[Repository Link Server](https://github.com/aaridoms/finapay-server)

[Deploy Link](https://finapay.netlify.app/)


### Excalidraw 

[Excalidraw Link](https://res.cloudinary.com/ddaezutq8/image/upload/v1694166640/Sin_t%C3%ADtulo-2023-09-08-1148_kykzbq.png)

### Slides

[Slides Link](www.your-slides-url-here.com)