import React, { useState } from 'react';

interface OptionsProps {}

const Options: React.FC<OptionsProps> = () => {
  const [setting1, setSetting1] = useState(false);
  const [setting2, setSetting2] = useState('');

  const handleSave = () => {
    // Save the settings
  };

  return (
    <div>
      <h1>Extension Settings</h1>

      <div className="setting">
        <label htmlFor="setting1">Setting 1:</label>
        <input
          type="checkbox"
          id="setting1"
          checked={setting1}
          onChange={(e) => setSetting1(e.target.checked)}
        />
      </div>

      <div className="setting">
        <label htmlFor="setting2">Setting 2:</label>
        <input
          type="text"
          id="setting2"
          value={setting2}
          onChange={(e) => setSetting2(e.target.value)}
        />
      </div>

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Options;
