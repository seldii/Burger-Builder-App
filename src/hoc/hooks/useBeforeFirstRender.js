import { useState, useEffect } from "react";

export default fn => {
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => setHasRendered(true), [hasRendered]);

  if (!hasRendered) {
    fn();
  }
};
