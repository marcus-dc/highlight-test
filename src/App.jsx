import { useEffect, useRef, useState } from 'react';
import generateRandomId from './utils/generateRandomId';
import './App.css';
import { Radio } from './components/Radio';

function App() {
  const [highlightColor, setHighlightColor] = useState('green');
  const [ranges, setRanges] = useState([]);
  let { current: selection } = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    if (!selection) return;

    selection.removeAllRanges();

    ranges.forEach((range) => {
      selection.addRange(range);
    });

    return () => {
      selection.removeAllRanges();
    };
  }, [ranges, selection]);

  const getData = () => {
    if (!container.current) return;

    const highlighted = [...container.current.getElementsByTagName('span')];

    const data = { like: [], dislike: [], doNotUnderstand: [] };

    highlighted.forEach((span) => {
      const id = generateRandomId();
      span.dataset.highlightId = id;

      const regex = new RegExp(
        `.+(?=<span.*?data-highlight-id="${id}".*?>.+<\/span>)`
      );

      switch (span.style.backgroundColor) {
        case 'green':
          data.like.push({
            content: span.textContent,
            offsetFromStart: container.current.innerHTML
              .replaceAll('<br>', '\n')
              .replace()
              .replace(/<[^>]+>/g, '')
              .indexOf(container.current.match(regex)[0]),
          });
          break;
        case 'red':
          data.dislike.push(span.textContent);
          break;
        case 'yellow':
          data.doNotUnderstand.push(span.textContent);
          break;
      }
    });

    console.log(
      container.current.innerHTML
        .replaceAll('<br>', '\n')
        .replace(/<[^>]+>/g, ''),
      container.current.innerHTML
    );

    console.log(data);
  };

  const handleHighlight = () => {
    selection = window.getSelection();

    if (!selection) return;
    if (!selection.toString().replace(/\s/g, '')) return;

    const range = selection.getRangeAt(0);

    document.designMode = 'on';

    if (range) {
      console.log(
        JSON.stringify(
          {
            hAnchorOffset: selection.anchorOffset,
            hFocusOffset: selection.focusOffset,
            hRangeCount: selection.rangeCount,
            rStartOffset: range.startOffset,
            rEndOffset: range.endOffset,
          },
          null,
          2
        )
      );

      // selection.removeAllRanges();
      // highlighted.addRange(range);
      setRanges((current) => [...current, range]);
    }

    document.execCommand('backColor', false, highlightColor);
    document.designMode = 'off';

    getData();

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
