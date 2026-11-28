"use client";

import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { usePreferences } from "../../locales/preferences";
import { ordersInQueue, orderTotal, queues } from "./demo-orders";

function OrderCard({ order, onSelect }) {
  const { copy, language } = usePreferences();
  const money = new Intl.NumberFormat(language, {
    style: "currency",
    currency: "ILS",
  });
  return (
    <button className="order-card" onClick={() => onSelect(order)}>
      <span className="card-head">
        <strong>
          {copy.order} <bdi>#{order.id}</bdi>
        </strong>
        <time>{order.time}</time>
      </span>
      <span className="card-items">
        {order.items.map((item) => (
          <span key={item.name}>
            <bdi>{item.quantity} × </bdi>
            {item.name}
          </span>
        ))}
      </span>
      <span className="card-total">
        {money.format(orderTotal(order) / 100)}
      </span>
    </button>
  );
}

function OrderDetails({ order, onClose, dialogRef }) {
  const { copy, language } = usePreferences();
  const money = new Intl.NumberFormat(language, {
    style: "currency",
    currency: "ILS",
  });
  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="order-details-title"
    >
      {order && (
        <>
          <div className="card-head">
            <h2 id="order-details-title">
              {copy.details} <bdi>#{order.id}</bdi>
            </h2>
            <button onClick={() => dialogRef.current.close()}>
              {copy.close}
            </button>
          </div>
          <ul className="detail-items">
            {order.items.map((item) => (
              <li key={item.name}>
                <span>
                  {item.quantity} × {item.name}
                </span>
                <strong>
                  {money.format((item.price * item.quantity) / 100)}
                </strong>
              </li>
            ))}
          </ul>
          <p className="card-head">
            <strong>{copy.total}</strong>
            <strong>{money.format(orderTotal(order) / 100)}</strong>
          </p>
        </>
      )}
    </dialog>
  );
}

export function OrdersBoard({ location }) {
  const { copy } = usePreferences();
  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ["orders", location],
    queryFn: async () => {
      const response = await fetch(
        "/api/orders?location=" + encodeURIComponent(location),
        { cache: "no-store" },
      );
      if (!response.ok) throw new Error("Orders unavailable");
      return response.json();
    },
  });
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  function open(order) {
    flushSync(() => setSelected(order));
    dialog.current.showModal();
  }
  return (
    <>
      <div className="board-heading">
        <div>
          <h1>{copy.heading}</h1>
          <p>{copy.description}</p>
        </div>
        <button
          className="refresh"
          disabled={isFetching}
          onClick={() => refetch()}
        >
          {copy.refresh}
        </button>
      </div>
      {isPending ? (
        <p role="status">{copy.loading}</p>
      ) : isError ? (
        <p role="alert">
          {copy.error} <button onClick={() => refetch()}>{copy.retry}</button>
        </p>
      ) : (
        <div className="queues">
          {queues.map((queue) => {
            const orders = ordersInQueue(data, queue);
            return (
              <section
                key={queue.id}
                className="queue"
                data-queue={queue.id}
                aria-labelledby={`queue-${queue.id}`}
              >
                <h2 id={`queue-${queue.id}`}>
                  {copy[queue.id]}{" "}
                  <span className="count">{orders.length}</span>
                </h2>
                <div className="queue-items">
                  {orders.length ? (
                    orders.map((order) => (
                      <OrderCard key={order.id} order={order} onSelect={open} />
                    ))
                  ) : (
                    <p>{copy.empty}</p>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      )}
      <OrderDetails
        order={selected}
        onClose={() => setSelected(null)}
        dialogRef={dialog}
      />
    </>
  );
}
