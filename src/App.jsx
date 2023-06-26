import { useState } from 'react';
import './App.css';
import { Radio } from './components/Radio';

function App() {
  const [highlightColor, setHighlightColor] = useState('green');

  const handleHighlight = () => {
    const highlighted = window.getSelection();
    if (!highlighted.toString()) return;

    const range = highlighted.getRangeAt(0);

    const span = document.createElement('span');
    span.style.backgroundColor = highlightColor;

    try {
      range.surroundContents(span);
    } catch (err) {
      console.log(range);
    }

    window.getSelection().removeAllRanges();
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
      onChange={(evt) => setHighlightColor(evt.target.value)}
    >
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Radio name="type" value="green" label="Like" />
        <Radio name="type" value="red" label="Dislike" />
        <Radio name="type" value="yellow" label="Do not understand" />
      </div>
      <div
        onMouseUp={handleHighlight}
        dangerouslySetInnerHTML={{
          __html:
            'Technology has transformed the way we live, work, and communicate. From the invention of the wheel to the creation of the internet, each new innovation has revolutionized society and opened up new possibilities. We now have the power to connect with people on the other side of the world in an instant, access a wealth of information at our fingertips, and even explore virtual realms through immersive virtual reality experiences.<br>Technology has transformed the way we live, work, and communicate. From the invention of the wheel to the creation of the internet, each new innovation has revolutionized society and opened up new possibilities. We now have the power to connect with people on the other side of the world in an instant, access a wealth of information at our fingertips, and even explore virtual realms through immersive virtual reality experiences.<br>Technology has transformed the way we live, work, and communicate. From the invention of the wheel to the creation of the internet, each new innovation has revolutionized society and opened up new possibilities. We now have the power to connect with people on the other side of the world in an instant, access a wealth of information at our fingertips, and even explore virtual realms through immersive virtual reality experiences.<br>Technology has transformed the way we live, work, and communicate. From the invention of the wheel to the creation of the internet, each new innovation has revolutionized society and opened up new possibilities. We now have the power to connect with people on the other side of the world in an instant, access a wealth of information at our fingertips, and even explore virtual realms through immersive virtual reality experiences.<br><br>Technology has transformed the way we live, work, and communicate. From the invention of the wheel to the creation of the internet, each new innovation has revolutionized society and opened up new possibilities. We now have the power to connect with people on the other side of the world in an instant, access a wealth of information at our fingertips, and even explore virtual realms through immersive virtual reality experiences.<br>Technology has transformed the way we live, work, and communicate. From the invention of the wheel to the creation of the internet, each new innovation has revolutionized society and opened up new possibilities. We now have the power to connect with people on the other side of the world in an instant, access a wealth of information at our fingertips, and even explore virtual realms through immersive virtual reality experiences.<br>Technology has transformed the way we live, work, and communicate. From the invention of the wheel to the creation of the internet, each new innovation has revolutionized society and opened up new possibilities. We now have the power to connect with people on the other side of the world in an instant, access a wealth of information at our fingertips, and even explore virtual realms through immersive virtual reality experiences.<br>Technology has transformed the way we live, work, and communicate. From the invention of the wheel to the creation of the internet, each new innovation has revolutionized society and opened up new possibilities. We now have the power to connect with people on the other side of the world in an instant, access a wealth of information at our fingertips, and even explore virtual realms through immersive virtual reality experiences.<br><br>',
        }}
      ></div>
    </form>
  );
}

export default App;
