import { useEffect, useState } from "react";
import "./footer.css";
import { useSearchParams } from "react-router-dom";

export default function JobFooter(props) {
  const [currentPage, setcurrentPage] = useState(props.page);
  let n = props.n;

  const [query, setQuery] = useSearchParams();

  useEffect(() => {
    let ele = document.getElementById("nav-blocks");
    ele.innerHTML = "";
    let block1, block2, block3, block4, block5, block6, blockn;
    // first-block
    block1 = document.createElement("div");
    block1.classList.add("block");
    block1.innerText = 1;
    if (n === 0) return;
    if (n === 1) {
      block1.classList.add("current-page");
      if (currentPage === 1) {
        block1.classList.add("current-page");
      }
      ele.append(block1);
      return;
    } else if (n === 2) {
      block1.addEventListener("click", () => {
        props.pageChanged(1);
        window.scrollTo(0, 300);
        setcurrentPage(1);
      });
      block2 = document.createElement("div");
      block2.classList.add("block");
      block2.innerText = 2;
      block2.addEventListener("click", () => {
        props.pageChanged(2);
        window.scrollTo(0, 300);
        setcurrentPage(2);
      });
      if (currentPage === 1) {
        block1.classList.add("current-page");
      } else if (currentPage === 2) {
        block2.classList.add("current-page");
      }
      ele.append(block1, block2);
      return;
    } else if (n === 3) {
      block1.addEventListener("click", () => {
        props.pageChanged(1);
        window.scrollTo(0, 300);
        setcurrentPage(1);
      });
      block2 = document.createElement("div");
      block2.classList.add("block");
      block2.innerText = 2;
      block2.addEventListener("click", () => {
        props.pageChanged(2);
        window.scrollTo(0, 300);
        setcurrentPage(2);
      });
      block3 = document.createElement("div");
      block3.classList.add("block");
      block3.innerText = 3;
      block3.addEventListener("click", () => {
        props.pageChanged(3);
        window.scrollTo(0, 300);
        setcurrentPage(3);
      });
      if (currentPage === 1) {
        block1.classList.add("current-page");
      } else if (currentPage === 2) {
        block2.classList.add("current-page");
      } else if (currentPage === 3) {
        block3.classList.add("current-page");
      }
      ele.append(block1, block2, block3);
      return;
    }

    blockn = document.createElement("div");
    blockn.classList.add("block");
    blockn.innerText = `${n}`;

    if (currentPage === 1) {
      block1.classList.add("current-page");
      block2 = document.createElement("div");
      block2.classList.add("block");
      block2.innerText = 2;
      block2.addEventListener("click", () => {
        props.pageChanged(2);
        window.scrollTo(0, 300);
        setcurrentPage(2);
      });
      block3 = document.createElement("div");
      block3.classList.add("block");
      block3.innerText = 3;
      block3.addEventListener("click", () => {
        props.pageChanged(3);
        window.scrollTo(0, 300);
        setcurrentPage(3);
      });
      block4 = document.createElement("div");
      block4.classList.add("dots");
      block4.innerText = "...";
      blockn.addEventListener("click", () => {
        props.pageChanged(n);
        window.scrollTo(0, 300);
        setcurrentPage(n);
      });
      ele.append(block1, block2, block3, block4, blockn);
    }

    if (currentPage === 2) {
      block1.addEventListener("click", () => {
        props.pageChanged(1);
        window.scrollTo(0, 300);
        setcurrentPage(1);
      });
      block2 = document.createElement("div");
      block2.classList.add("current-page");
      block2.classList.add("block");
      block2.innerText = 2;
      block3 = document.createElement("div");
      block3.classList.add("block");
      block3.innerText = 3;
      block3.addEventListener("click", () => {
        props.pageChanged(3);
        window.scrollTo(0, 300);
        setcurrentPage(3);
      });
      block4 = document.createElement("div");
      block4.classList.add("dots");
      block4.innerText = "...";
      blockn.addEventListener("click", () => {
        props.pageChanged(n);
        window.scrollTo(0, 300);
        setcurrentPage(n);
      });
      ele.append(block1, block2, block3, block4, blockn);
    }

    if (currentPage === 3 && n > 5) {
      block1.addEventListener("click", () => {
        props.pageChanged(1);
        window.scrollTo(0, 300);
        setcurrentPage(1);
      });
      block2 = document.createElement("div");
      block2.classList.add("block");
      block2.innerText = 2;
      block2.addEventListener("click", () => {
        props.pageChanged(2);
        window.scrollTo(0, 300);
        setcurrentPage(2);
      });
      block3 = document.createElement("div");
      block3.classList.add("block");
      block3.classList.add("current-page");
      block3.innerText = 3;

      block4 = document.createElement("div");
      block4.classList.add("block");
      block4.innerText = 4;
      block4.addEventListener("click", () => {
        props.pageChanged(4);
        window.scrollTo(0, 300);
        setcurrentPage(4);
      });

      block5 = document.createElement("div");
      block5.classList.add("dots");
      block5.innerText = "...";

      blockn.addEventListener("click", () => {
        props.pageChanged(n);
        window.scrollTo(0, 300);
        setcurrentPage(n);
      });
      ele.append(block1, block2, block3, block4, block5, blockn);
    }

    if (currentPage > 3 && currentPage < n - 2) {
      block1.addEventListener("click", () => {
        props.pageChanged(1);
        window.scrollTo(0, 300);
        setcurrentPage(1);
      });
      block2 = document.createElement("div");
      block2.classList.add("dots");
      block2.innerText = "...";
      block3 = document.createElement("div");
      block3.classList.add("block");
      block3.innerText = `${currentPage - 1}`;
      block3.addEventListener("click", () => {
        props.pageChanged(currentPage - 1);
        window.scrollTo(0, 300);
        setcurrentPage(currentPage - 1);
      });
      block4 = document.createElement("div");
      block4.classList.add("block");
      block4.classList.add("current-page");
      block4.innerText = `${currentPage}`;
      block5 = document.createElement("div");
      block5.classList.add("block");
      block5.innerText = `${currentPage + 1}`;
      block5.addEventListener("click", () => {
        props.pageChanged(currentPage + 1);
        window.scrollTo(0, 300);
        setcurrentPage(currentPage + 1);
      });
      block6 = document.createElement("div");
      block6.classList.add("dots");
      block6.innerText = "...";

      blockn.addEventListener("click", () => {
        props.pageChanged(n);
        window.scrollTo(0, 300);
        setcurrentPage(n);
      });
      ele.append(block1, block2, block3, block4, block5, block6, blockn);
    }

    if (currentPage === n) {
      block1.addEventListener("click", () => {
        props.pageChanged(1);
        window.scrollTo(0, 300);
        setcurrentPage(1);
      });
      block2 = document.createElement("div");
      block2.classList.add("dots");
      block2.innerText = "...";
      block3 = document.createElement("div");
      block3.innerText = `${n - 2}`;
      block3.classList.add("block");
      block3.addEventListener("click", () => {
        props.pageChanged(n - 2);
        window.scrollTo(0, 300);
        setcurrentPage(n - 2);
      });
      block4 = document.createElement("div");
      block4.innerText = `${n - 1}`;
      block4.classList.add("block");
      block4.addEventListener("click", () => {
        props.pageChanged(n - 1);
        window.scrollTo(0, 300);
        setcurrentPage(n - 1);
      });
      blockn.classList.add("current-page");
      ele.append(block1, block2, block3, block4, blockn);
    }

    if (currentPage === n - 1) {
      block1.addEventListener("click", () => {
        props.pageChanged(1);
        window.scrollTo(0, 300);
        setcurrentPage(1);
      });
      block2 = document.createElement("div");
      block2.classList.add("dots");
      block2.innerText = "...";
      block3 = document.createElement("div");
      block3.innerText = `${n - 2}`;
      block3.classList.add("block");
      block3.addEventListener("click", () => {
        props.pageChanged(n - 2);
        window.scrollTo(0, 300);
        setcurrentPage(n - 2);
      });
      block4 = document.createElement("div");
      block4.innerText = `${n - 1}`;
      block4.classList.add("block");
      block4.classList.add("current-page");
      blockn.addEventListener("click", () => {
        props.pageChanged(n);
        window.scrollTo(0, 300);
        setcurrentPage(n);
      });
      ele.append(block1, block2, block3, block4, blockn);
    }

    if (currentPage === n - 2) {
      block1.addEventListener("click", () => {
        props.pageChanged(n - 1);
        window.scrollTo(0, 300);
        setcurrentPage(1);
      });
      block2 = document.createElement("div");
      block2.classList.add("dots");
      block2.innerText = "...";

      block5 = document.createElement("div");
      block5.innerText = `${n - 3}`;
      block5.classList.add("block");
      block5.addEventListener("click", () => {
        props.pageChanged(n - 3);
        window.scrollTo(0, 300);
        setcurrentPage(n - 3);
      });

      block3 = document.createElement("div");
      block3.innerText = `${n - 2}`;
      block3.classList.add("block");
      block3.classList.add("current-page");

      block4 = document.createElement("div");
      block4.innerText = `${n - 1}`;
      block4.classList.add("block");
      block4.addEventListener("click", () => {
        props.pageChanged(n - 1);
        window.scrollTo(0, 300);
        setcurrentPage(n - 1);
      });
      blockn.addEventListener("click", () => {
        props.pageChanged(n);
        window.scrollTo(0, 300);
        setcurrentPage(n);
      });
      ele.append(block1, block2, block5, block3, block4, blockn);
    }

    //last block
  }, [currentPage, props]);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        height: "80px",
        padding: "25px 0px",
      }}
    >
      {currentPage > 1 ? (
        <div
          style={{
            color: "black",
            cursor: "pointer",
            fontWeight: "400",
            display: "flex",
            flexDirection: "row",
          }}
          onClick={() => {
            props.pageChanged(currentPage - 1);
            window.scrollTo(0, 300);
            setcurrentPage(currentPage - 1);
          }}
        >
          ←{" "}
          <span className="np-btns" style={{ marginLeft: "5px" }}>
            {" "}
            Previous
          </span>
        </div>
      ) : (
        <div></div>
      )}
      <div className="nav-blocks" id="nav-blocks"></div>
      {currentPage < n ? (
        <div
          style={{
            color: "black",
            cursor: "pointer",
            fontWeight: "400",
            display: "flex",
            flexDirection: "row",
          }}
          onClick={() => {
            props.pageChanged(currentPage + 1);
            window.scrollTo(0, 300);
            setcurrentPage(currentPage + 1);
          }}
        >
          <span className="np-btns" style={{ marginRight: "5px" }}>
            Next{" "}
          </span>{" "}
          →
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
