import { useRef, useState } from 'react';
import './App.css';
import { Radio } from './components/Radio';

function App() {
  const [highlightColor, setHighlightColor] = useState('green');
  const container = useRef(null);

  const _ = () => {
    if (!container.current) return;

    const highlighted = [...container.current.getElementsByTagName('span')];

    const data = { like: [], dislike: [], doNotUnderstand: [] };

    highlighted.forEach((span) => {
      switch (span.style.backgroundColor) {
        case 'green':
          data.like.push(span.textContent);
          return;
        case 'red':
          data.dislike.push(span.textContent);
          return;
        case 'yellow':
          data.doNotUnderstand.push(span.textContent);
          return;
      }
    });

    console.log(data);
  };

  const handleHighlight = () => {
    const highlighted = window.getSelection();
    if (!highlighted.toString().replace(/\s/g, '')) return;

    const range = highlighted.getRangeAt(0);

    document.designMode = 'on';

    if (range) {
      console.log(highlighted.anchorOffset, range.startOffset, range.endOffset);

      console.log(highlighted.anchorOffset);

      highlighted.removeAllRanges();
      highlighted.addRange(range);
    }

    document.execCommand('backColor', false, highlightColor);
    document.designMode = 'off';

    _();

    window.getSelection().removeAllRanges();
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
      onChange={(evt) => setHighlightColor(evt.target.value)}
    >
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Radio name="action" value="green" label="Like" />
        <Radio name="action" value="red" label="Dislike" />
        <Radio name="action" value="yellow" label="Do not understand" />
        <Radio name="action" value="transparent" label="Erase" />
      </div>
      <div
        ref={container}
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
