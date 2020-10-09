import React from "react";

// const data = [
//   { debitor: "Mayank", creditor: "Jigyasa", amount: 2000 },
//   { debitor: "Gautham", creditor: "Jigyasa", amount: 4000 },
//   { debitor: "Jigyasa", creditor: "Rohit", amount: 6000 },
//   { debitor: "Rohit", creditor: "Jigyasa", amount: 2000 },
//   { debitor: "Rohit", creditor: "Gautham", amount: 4000 },
// ];

export default function Optimizer({ data }) {
  const [state, setState] = React.useState(() => {
    const actors = [
      ...new Set([
        ...[...new Set(data.map((item) => item.creditor))],
        ...[...new Set(data.map((item) => item.debitor))],
      ]),
    ];
    const size = actors.length;
    let transMatrix = Array(size)
      .fill(Array(size).fill(0))
      .map((a) => a.slice());

    actors.forEach((actor) => {
      data.forEach((transaction) => {
        if (transaction.debitor === actor) {
          transMatrix[actors.indexOf(actor)][
            actors.indexOf(transaction.creditor)
          ] = transaction.amount;
        }
      });
    });

    const actorMap = {};
    actors.forEach((actor, index) => {
      actorMap[index] = actor;
    });

    const amounts = Array(size).fill(0);
    amounts.forEach((val, row) =>
      amounts.forEach((val, col) => {
        amounts[row] += transMatrix[col][row] - transMatrix[row][col];
      })
    );
    return {
      actors,
      size,
      transMatrix,
      actorMap,
      amounts,
    };
  });

  const getMinMax = (amounts) => ({
    minIndx: amounts.indexOf(Math.min(...amounts)),
    maxIndx: amounts.indexOf(Math.max(...amounts)),
  });

  const minCashFlow = (amounts) => {
    const { minIndx, maxIndx } = getMinMax(amounts);
    if (amounts[minIndx] === 0 && amounts[maxIndx] === 0) {
      return <h3>ENDED</h3>;
    }

    let minAmount = Math.min(
      Math.abs(amounts[minIndx]),
      Math.abs(amounts[maxIndx])
    );

    amounts[maxIndx] -= minAmount;
    amounts[minIndx] += minAmount;

    console.log(amounts);
    return (
      <>
        <p>
          {state.actorMap[minIndx]} should pay {minAmount} to{" "}
          {state.actorMap[maxIndx]}
        </p>
        <div>{minCashFlow(amounts)}</div>
      </>
    );
  };

  console.log(state);
  return <div>{minCashFlow(state.amounts)}</div>;
}
