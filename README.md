## Breif Description

A web-application for determining the shortest path cash flow when a set of transactions are entered as "X owes Y" pairs. 

## About ExpaFlow
It shows the shortest route a cash transfer amongst peers can take place and will execute it successfully. The objective of making such a software is not only to help keep track of who owes what, but also to optimize the entire process as stated previously. Greedy algorithm on Graphs using an adjacent matrix has been implemented. (Optimizer Component)

## Algorithm 
1. Compute the net amount for each individual. Subtracts all debits and credits
2. Find the two people that are maximum creditor and maximum debtor. Let
the maximum amount to be credited maximum creditor be maxcredit and
maximum amount to be debited from maximum debtor be maxdebit. Let the
maximum debtor be pd and maximum creditor be pc.
3. Find the minimum of maxdebit and maxcredit. Let the minimum of two be
x. Debit ‘x’ from pd and credit this amount to pc
4. If x is equal to maxcredit, then remove pc from a set of persons and recur
for remaining (n-1) persons.
5. If x is equal to maxdebit, then remove pd from the set of persons and recur
for remaining (n-1) persons.

## Features
Cash Flow Optimizer : ( Greedy Algorithm )
> A Component to Optimize transactions amongst all the participants,
It takes the Name of the Creditor and Debitor in a particular format
along with the amount to be paid and a note regarding the Context
of the Transaction.

Parallax Carousel :
> A carousel with Items that display using a Parallax effect. It’s main
purpose is to highlight the features of Expa Flow along with briefly
describing them.

Authentication System :
> User Authentication using Googles Authentication Provider, allows
Expa Flow to access the data entries linked to the Users Google
Account to provide a more Bespoke feel.

Theme Switching :
> The Theme Switcher allows the User to switch between Light and
Dark mode

## Flow-Chart
![image](https://user-images.githubusercontent.com/52369953/122641712-9728e680-d124-11eb-9be7-4bc7c859ae80.png)

## Application Screenshots
![image](https://user-images.githubusercontent.com/52369953/122641756-d7886480-d124-11eb-934d-8160c7c1fd2e.png)

![image](https://user-images.githubusercontent.com/52369953/122641776-eb33cb00-d124-11eb-90ce-85272ccc89aa.png)

![image](https://user-images.githubusercontent.com/52369953/122641785-f8e95080-d124-11eb-8fc1-8cc26ad3fd2e.png)

## Code Explanation for Algorithm

```
SEE THE OPTIMIZER COMPONENT
 
// DATA
/*
data = [
  {debitor:<name>, amount:<number>, creditor:<name>}
  {debitor:<name>, amount:<number>, creditor:<name>},
  {debitor:<name>, amount:<number>, creditor:<name>},
  ...]
 */
 
// Analyser function
const outputGenerator = () => {
  // creates a set of all the names (both creditors and debitors included)
  const actors = [
    ...new Set([
      ...[...new Set(data.map((item) => item.creditor))],
      ...[...new Set(data.map((item) => item.debitor))],
    ]),
  ];

  // size of set => generally considered as "n"
  const size = actors.length;

  // creating empty Adjacency Matrix (size X size)
  let transMatrix = Array(size)
    .fill(Array(size).fill(0))
    .map((a) => a.slice());

  // Populating the Adjacency Matrix with the user provided
  // data and indexing it accordingly [nameRow][nameCol] = amount   i.e => nameRow pays nameCol amount
  actors.forEach((actor) => {
    data.forEach((transaction) => {
      if (transaction.debitor === actor) {
        transMatrix[actors.indexOf(actor)][
          actors.indexOf(transaction.creditor)
        ] += Number(transaction.amount);
      }
    });
  });

  // A map that stores each actors index and their name as key:value pairs
  // necessary for displaying names later on
  const actorMap = {};
  actors.forEach((actor, index) => {
    actorMap[index] = actor;
  });

  // Empty list of amounts
  const amounts = Array(size).fill(0);
  // Populating the Amounts list with optimized amounts
  amounts.forEach((val, row) =>
    amounts.forEach((val, col) => {
      amounts[row] +=
        Number(transMatrix[col][row]) - Number(transMatrix[row][col]);
    })
  );

  return { actorMap, amounts };
};

// storing the outputs after data analysis
const { actorMap, amounts } = outputGenerator();

// Find and return the indexes of the minimum and maximum amounts
const getMinMax = (amounts) => ({
  minIndx: amounts.indexOf(Math.min(...amounts)),
  maxIndx: amounts.indexOf(Math.max(...amounts)),
});

// Reccuring function 
const minCashFlow = (amounts) => {
  // storing the min and max net amounts,
  // i.e, highest amount to be received
  // and highest amount to be paid
  const { minIndx, maxIndx } = getMinMax(amounts);

  // Break Condition: both lowest and highest amounts to be settled are 0
  if (amounts[minIndx] === 0 && amounts[maxIndx] === 0) {
    return transactions;
  }

  // lowest in magnitude
  let minAmount = Math.min(
    Math.abs(amounts[minIndx]),
    Math.abs(amounts[maxIndx])
  );

  // settling amounts
  amounts[maxIndx] -= minAmount;
  amounts[minIndx] += minAmount;

  transactions.push(
    <>
      <ListItem key={uuid()}>
        <ListItemAvatar>
          <Avatar>
            <Grain />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`
        ${actorMap[minIndx]} should pay ₹${minAmount} to ${actorMap[maxIndx]}
      `}
        />
      </ListItem>
      <Divider variant='middle' />
    </>
  );

  // reccuring the minCashFlow()
  return <>{minCashFlow(amounts)}</>;
};

```

## References and Acknowledgement
- https://github.com/mui-org/material-ui
- https://www.geeksforgeeks.org/minimize-cash-flow-among-given-set-friends-borrowed-money/
- 


