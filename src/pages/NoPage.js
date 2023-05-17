import React, { useEffect, useLayoutEffect, useState } from "react";

import {
  unstable_usePrompt as Prompt,
  unstable_useBlocker as useBlocker,
} from "react-router-dom";
function ConfirmNavigation({ blocker }) {
  if (blocker.state === "blocked") {
    return (
      <>
        <p style={{ color: "red" }}>
          Blocked the last navigation to {blocker.location.pathname}
        </p>
        <button onClick={() => blocker.proceed?.()}>Let me through</button>
        <button onClick={() => blocker.reset?.()}>Keep me here</button>
      </>
    );
  }

  if (blocker.state === "proceeding") {
    return (
      <p style={{ color: "orange" }}>Proceeding through blocked navigation</p>
    );
  }

  return <p style={{ color: "green" }}>Blocker is currently unblocked</p>;
}
function NoPage() {
  return (
    <>
      <h1>Page 2</h1>
    </>
  );
}

export default NoPage;
