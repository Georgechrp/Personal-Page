// Typing + deleting loop για πολλές προτάσεις
const phrases = [
  "Open to Remote/Hybrid Positions",
  "Junior Software Engineer",
  "Informatics Graduate, University of Piraeus",
  "Kotlin Enthusiast",
];

const el = document.getElementById('typeTarget');
const typeSpeed = 80;          // ms ανά χαρακτήρα όταν γράφει
const deleteSpeed = 50;        // ms ανά χαρακτήρα όταν διαγράφει
const holdAfterType = 1000;    // παύση στο τέλος της λέξης
const holdAfterDelete = 400;   // παύση όταν έχει σβηστεί όλη η λέξη

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function tick() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    // γράφει
    charIndex++;
    el.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      // έφτασε στο τέλος, περίμενε και άρχισε διαγραφή
      setTimeout(() => { isDeleting = true; tick(); }, holdAfterType);
      return;
    }
    setTimeout(tick, typeSpeed);
  } else {
    // διαγράφει
    charIndex--;
    el.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      // πήγαινε στην επόμενη λέξη
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(tick, holdAfterDelete);
      return;
    }
    setTimeout(tick, deleteSpeed);
  }
}

// ξεκίνα
tick();
