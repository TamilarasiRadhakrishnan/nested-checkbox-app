import React, { useState } from "react";

const data = [
  {
    id: "fruits",
    label: "Fruits",
    children: [
      { id: "apple", label: "Apple" },
      { id: "banana", label: "Banana" },
      { id: "orange", label: "Orange" }
    ]
  },
  {
    id: "vegetables",
    label: "Vegetables",
    children: [
      { id: "carrot", label: "Carrot" },
      { id: "broccoli", label: "Broccoli" }
    ]
  }
];

const NestedCheckbox = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheck = (id, children) => {
    const updated = { ...checkedItems };
    const isChecked = !checkedItems[id];

    const toggleChildren = (items) => {
      items.forEach((item) => {
        updated[item.id] = isChecked;
        if (item.children) toggleChildren(item.children);
      });
    };

    updated[id] = isChecked;
    if (children) toggleChildren(children);

    setCheckedItems(updated);
  };

  const renderTree = (nodes) => (
    <ul>
      {nodes.map((node) => (
        <li key={node.id}>
          <label>
            <input
              type="checkbox"
              checked={!!checkedItems[node.id]}
              onChange={() => handleCheck(node.id, node.children)}
            />
            {node.label}
          </label>
          {node.children && renderTree(node.children)}
        </li>
      ))}
    </ul>
  );

  return <div>{renderTree(data)}</div>;
};

export default NestedCheckbox;
