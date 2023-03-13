import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../contexts/WebsocketContext";

import "../App.css";

type MessagePayload = {
  msg: string;
  clientId: string;
  content: string;
};

export const WebsocketComponent = () => {
  const [stateValue, setStateValue] = useState(""); // Extract useState variables
  const [messages, setMessages] = useState<MessagePayload[]>([]); // Store an array of payloads
  const socket = useContext(WebsocketContext);
  const socket2 = useContext(WebsocketContext);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("React app successfuly connected!");
    });
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("onMessage", (newMessage) => {
      console.log("onMessage event received!");
      console.log(newMessage);

      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      console.log("Unregistering Events...");
      socket.off("connect");
      socket.off("onMessage");
    };
  }, [socket]); // Effect depends on socket

  const onSubmit = () => {
    socket.emit("newMessage", stateValue);
    socket2.emit("newMessage", stateValue);
    setStateValue("");
  };

  return (
    <div>
      <div>
        <h1>Websocket component</h1>
        <div>
          {messages.length === 0 ? (
            <div>No messages</div>
          ) : (
            <div>
              {messages.map((msg) => (
                <div>
                  {msg.clientId === socket.id ? (
                    <p className="my-message">{msg.content}</p>
                  ) : (
                    <p>
                      {msg.clientId}: {msg.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Message to submit"
            value={stateValue}
            onChange={(e) => setStateValue(e.target.value)}
          />
        </div>
        {/* Binds the variable to the state value. `e` is the event */}
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};
