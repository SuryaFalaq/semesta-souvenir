import * as React from "react";
import { ChevronDown } from "lucide-react";

const Select = ({ children, onValueChange, value }) => {
  return (
    <SelectContext.Provider value={{ onValueChange, value }}>
      {children}
    </SelectContext.Provider>
  );
};

const SelectContext = React.createContext();

const SelectTrigger = React.forwardRef(({ className = "", children, ...props }, ref) => {
  const { value } = React.useContext(SelectContext);
  const [open, setOpen] = React.useState(false);
  
  return (
    <div className="relative">
      <button
        type="button"
        ref={ref}
        className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        onClick={() => setOpen(!open)}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    </div>
  );
});

SelectTrigger.displayName = "SelectTrigger";

const SelectValue = ({ placeholder }) => {
  const { value } = React.useContext(SelectContext);
  return <span>{value || placeholder}</span>;
};

const SelectContent = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  
  if (!open) return null;
  
  return (
    <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg">
      <div className="max-h-60 overflow-auto p-1">
        {children}
      </div>
    </div> 
  );
};

const SelectItem = React.forwardRef(({ className = "", children, value, ...props }, ref) => {
  const { onValueChange } = React.useContext(SelectContext);
  
  return (
    <div
      ref={ref}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </div>
  );
});

SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };