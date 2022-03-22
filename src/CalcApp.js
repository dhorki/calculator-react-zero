import React, { useState } from "react";

const CalcApp = () => {
  const [displayValue, setDisplayValue] = useState(0);
  const [dotUsed, setDotUsed] = useState(false);
  const [operator, setOperator] = useState("");
  const [memory, setMemory] = useState("");
  const [term1, setTerm1] = useState("");
  const [term2, setTerm2] = useState("");
  const [clearOnNumber, setClearOnNumber] = useState(false);

  const resetAll = () => {
    setDisplayValue(0);
    setDotUsed(false);
    setOperator("");
    setTerm1("");
    setTerm2("");
    setClearOnNumber(false);
  };

  const resultIsError = () => {
    return displayValue === "err";
  };

  const overrideDisplayValue = (value) => {
    if (isNaN(value) || value === Infinity) {
      setDisplayValue("err");
      setOperator("");
    } else {
      setDisplayValue(value);
      if (term2) {
        setTerm2("");
      }
    }
    setClearOnNumber(true);
  };

  const handleBasicOperation = (button) => {
    if (!resultIsError()) {
      setDotUsed(false);
      setTerm1(displayValue);
      setTerm2("");
      setOperator(button);
      setClearOnNumber(true);
    }
  };

  const handleEquals = () => {
    if (!resultIsError() && operator) {
      if (!term2) setTerm2(Number(displayValue));
      const t1 = Number(term1);
      const t2 = term2 ? term2 : Number(displayValue);
      let operationString = "";
      switch (operator) {
        case "x":
          operationString = `(${t1})*(${t2})`;
          break;
        case "√":
          operationString = `(${t1})**(1/${t2})`;
          break;
        case "xn":
          operationString = `(${t1})**(${t2})`;
          break;
        default:
          operationString = `(${t1})${operator}(${t2})`;
      }

      console.log(operationString);
      let evalResult = eval(operationString);

      if (isNaN(evalResult) || evalResult === Infinity) {
        setDisplayValue("err");
        setOperator("");
      } else {
        evalResult = Number(evalResult.toFixed(6));
        setDisplayValue(evalResult);
        setTerm1(evalResult);
      }
      setClearOnNumber(true);
    }
  };

  const handleNumber = (button) => {
    if (resultIsError()) {
      resetAll();
    }
    if (clearOnNumber) {
      overrideDisplayValue(button);
    } else {
      displayValue === 0
        ? setDisplayValue(button)
        : setDisplayValue((r) => r + button);
    }
    setClearOnNumber(false);
  };

  const log = () => {
    console.log({
      result: displayValue,
      dotUsed,
      clearOnNumber,
      operator,
      term1,
      term2,
    });
  };

  const handleButton = (button) => {
    console.log({ button });

    switch (button) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        handleNumber(button);
        break;
      case ".":
        if (!dotUsed && !resultIsError()) {
          setDotUsed(true);
          setDisplayValue((r) => r + button);
        }
        break;
      case "AC":
        resetAll();
        break;
      case "CE":
        overrideDisplayValue(0);
        break;
      case "/":
      case "x":
      case "-":
      case "+":
      case "√":
      case "xn":
        handleBasicOperation(button);
        break;
      case "=":
        handleEquals();
        break;
      case "-/+":
        if (!resultIsError()) {
          overrideDisplayValue(displayValue * -1);
        }
        break;
      case "1/x":
        if (!resultIsError()) {
          overrideDisplayValue(1 / displayValue);
        }
        break;
      case "%":
        if (!resultIsError()) {
          if (term1) {
            setTerm2(term1 * (displayValue / 100));
          } else {
            overrideDisplayValue(displayValue / 100);
          }
        }
        break;
      case "MC":
        setMemory("");
        break;
      case "MR":
        if (memory) {
          overrideDisplayValue(memory);
        }
        break;
      case "M+":
        setMemory(memory + displayValue);
        break;
      case "M-":
        setMemory(memory - displayValue);
        break;
    }
    log();
  };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td colSpan="4">
              <div className="display">
                <div className="status_display">
                  {memory ? "M" : ""} {operator}
                </div>

                <div className="display_value">{displayValue}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <button className="memory" onClick={() => handleButton("MC")}>
                MC
              </button>
            </td>
            <td>
              <button className="memory" onClick={() => handleButton("MR")}>
                MR
              </button>
            </td>
            <td>
              <button className="memory" onClick={() => handleButton("M+")}>
                M+
              </button>
            </td>
            <td>
              <button className="memory" onClick={() => handleButton("M-")}>
                M-
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="reset" onClick={() => handleButton("AC")}>
                AC
              </button>
            </td>
            <td>
              <button className="special" onClick={() => handleButton("√")}>
                √
              </button>
            </td>
            <td>
              <button className="special" onClick={() => handleButton("xn")}>
                xⁿ
              </button>
            </td>
            <td>
              <button className="special" onClick={() => handleButton("1/x")}>
                1/x
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="reset" onClick={() => handleButton("CE")}>
                CE
              </button>
            </td>
            <td>
              <button className="special" onClick={() => handleButton("-/+")}>
                -/+
              </button>
            </td>
            <td>
              <button className="special" onClick={() => handleButton("%")}>
                %
              </button>
            </td>
            <td>
              <button className="operation" onClick={() => handleButton("/")}>
                /
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="number" onClick={() => handleButton("7")}>
                7
              </button>
            </td>
            <td>
              <button className="number" onClick={() => handleButton("8")}>
                8
              </button>
            </td>
            <td>
              <button className="number" onClick={() => handleButton("9")}>
                9
              </button>
            </td>
            <td>
              <button className="operation" onClick={() => handleButton("x")}>
                x
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="number" onClick={() => handleButton("4")}>
                4
              </button>
            </td>
            <td>
              <button className="number" onClick={() => handleButton("5")}>
                5
              </button>
            </td>
            <td>
              <button className="number" onClick={() => handleButton("6")}>
                6
              </button>
            </td>
            <td>
              <button className="operation" onClick={() => handleButton("-")}>
                -
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="number" onClick={() => handleButton("1")}>
                1
              </button>
            </td>
            <td>
              <button className="number" onClick={() => handleButton("2")}>
                2
              </button>
            </td>
            <td>
              <button className="number" onClick={() => handleButton("3")}>
                3
              </button>
            </td>
            <td>
              <button className="operation" onClick={() => handleButton("+")}>
                +
              </button>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button className="number" onClick={() => handleButton("0")}>
                0
              </button>
            </td>

            <td>
              <button className="number" onClick={() => handleButton(".")}>
                .
              </button>
            </td>
            <td>
              <button className="operation" onClick={() => handleButton("=")}>
                =
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CalcApp;
