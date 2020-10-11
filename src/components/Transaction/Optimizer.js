import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { v4 as uuid } from "uuid";
import { Grain } from "@material-ui/icons";

export default function Optimizer({ data }) {
  const transactions = [];
  const outputGenerator = () => {
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
          ] += Number(transaction.amount);
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
        amounts[row] +=
          Number(transMatrix[col][row]) - Number(transMatrix[row][col]);
      })
    );
    return { actorMap, amounts };
  };

  const { actorMap, amounts } = outputGenerator();

  const getMinMax = (amounts) => ({
    minIndx: amounts.indexOf(Math.min(...amounts)),
    maxIndx: amounts.indexOf(Math.max(...amounts)),
  });

  const minCashFlow = (amounts) => {
    const { minIndx, maxIndx } = getMinMax(amounts);
    if (amounts[minIndx] === 0 && amounts[maxIndx] === 0) {
      return transactions;
    }

    let minAmount = Math.min(
      Math.abs(amounts[minIndx]),
      Math.abs(amounts[maxIndx])
    );

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

    return <>{minCashFlow(amounts)}</>;
  };

  return <>{minCashFlow(amounts)}</>;
}
