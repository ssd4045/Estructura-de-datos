//Enqueue
let counter = 0;
function enqueue(arg) {
  if (queue[0] === undefined) {
    queue[0] = arg;
    counter++;
  } else {
    queue[counter] = arg;
    counter++;
  }
  return queue;
}
