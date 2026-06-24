const parallax_el = document.querySelectorAll(".parallax");

let xvalue = 0,
  yvalue = 0,
  rotateDegree = 0;

function update(cursorPosition) {
  parallax_el.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;

    let isInLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;

    let zvalue =
      (cursorPosition - parseFloat(getComputedStyle(el).left)) *
      isInLeft *
      0.1;

    el.style.transform = `translateX(calc(-50% + ${xvalue * speedx}px))
      translateY(calc(-50% + ${yvalue * speedy}px))
      perspective(2300px) translateZ(${zvalue * speedz}px)
      rotateY(${rotateDegree * rotateSpeed}deg)
      scale(1.15)`;
  });
}

update(0);

window.addEventListener("mousemove", (e) => {
  xvalue = e.clientX - window.innerWidth / 2;
  yvalue = e.clientY - window.innerHeight / 2;
  rotateDegree = (xvalue / (window.innerWidth / 2)) * 20;

  update(e.clientX);
});

// Entrance animation
let tl = gsap.timeline();

tl.set(".parallax", { opacity: 0, scale: 1.38 })
  .to(".parallax", {
    opacity: 1,
    scale: 1.15,
    duration: 1.5,
    ease: "power2.out",
    stagger: {
      amount: 2,
      from: "random",
    },
  })
  .from(
    ".text h2",
    {
      x: -300,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    },
    "-=1"
  )
  .from(
    ".text h1",
    {
      x: 300,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    },
    "-=0.8"
  );
