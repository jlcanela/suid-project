import { createSignal } from "solid-js";
import { FormControlLabel, Switch } from "@suid/material";

// Define Action type
export type Action = "Add" | "Remove" | "Nothing";

// Define Toggle component props
interface ToggleProps {
  initialState: boolean;
  key: number;
  label: string;
  setAction: (key: number, action: Action) => void; // Updated signature
}

const Toggle = (props: ToggleProps) => {
  // Create a signal to manage the active state of the switch
  const [active, setActive] = createSignal(props.initialState);

  // Handle toggle switch change
  const handleToggle = () => {
    const newState = !active(); // Toggle the current state
    setActive(newState); // Update the signal

    // Compute the action based on comparison with initialState
    let action: Action;
    if (newState === props.initialState) {
      action = "Nothing"; // If newState equals initialState, return "Nothing"
    } else {
      action = newState ? "Add" : "Remove"; // If different, return "Add" or "Remove"
    }

    // Call setAction with the key and action
    props.setAction(props.key, action);
  };

  return (
    <div style={{ "margin-bottom": "8px" }}>
      <FormControlLabel
        control={
          <Switch
            checked={active()} // Bind to signal
            onChange={handleToggle} // Handle toggle
          />
        }
        label={props.label} // Display role description
      />
    </div>
  );
};

export default Toggle;
