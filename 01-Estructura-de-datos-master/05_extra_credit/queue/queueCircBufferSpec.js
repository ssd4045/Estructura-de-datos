describe('A circular buffer queue', function() {
  var queue;

  beforeEach(function() {
    queue = new QueueCirc(4);
  });

  it('should be implemented with a Uint8Array typed array (taking length as a parameter)', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array#Examples
    expect(queue.data instanceof Uint8Array).toBe(true);
    expect(queue.data.length).toBe(4);
    expect(new QueueCirc(16).data.length).toBe(16);
  });

  it('has `enqueue` and `dequeue` methods', function() {
    expect(queue.enqueue).toEqual(jasmine.any(Function));
    expect(queue.dequeue).toEqual(jasmine.any(Function));
  });

  describe('Enqueue method', function() {
    it('should add the correct values to the queue', function() {
      queue.enqueue(10);
      queue.enqueue(21);
      expect(queue.data[0]).toBe(10);
      expect(queue.data[1]).toBe(21);
    });

    it('should only accept numbers from 0 to 255 inclusive', function() {
      expect(function() {
        queue.enqueue('invalid value!');
      }).toThrow();
      expect(function() {
        queue.enqueue(256);
      }).toThrow();
      expect(function() {
        queue.enqueue(-1);
      }).toThrow();
    });
  });
  describe('Dequeue method', function() {
    it('should return the correct item', function() {
      queue.enqueue(1);
      queue.enqueue(6);
      queue.enqueue(10);
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(6);
      expect(queue.dequeue()).toBe(10);
    });
    it('should handle interspersed enqueuing and dequeuing', function() {
      queue.enqueue(3);
      queue.enqueue(10);
      expect(queue.dequeue()).toBe(3);
      queue.enqueue(41);
      queue.enqueue(35);
      expect(queue.dequeue()).toBe(10);
      expect(queue.dequeue()).toBe(41);
    });
    it('should handle underflow (throw an error when dequeuing from an empty buffer)', function() {
      expect(function() {
        queue.dequeue();
      }).toThrow();
    });
  });

  describe('Handling overflow', function() {
    it('should throw an error when enqueuing onto a full buffer', function() {
      queue.enqueue(14);
      queue.enqueue(7);
      queue.enqueue(20);
      queue.enqueue(31);
      expect(function() {
        queue.enqueue(7);
      }).toThrow();
    });
  });

  describe('Handling wrapping', function() {
    it('should wrap correctly', function() {
      queue.enqueue(12);
      queue.enqueue(81);
      queue.enqueue(200);
      queue.enqueue(32);
      queue.dequeue();
      queue.enqueue(14);
      expect(queue.data[0]).toBe(14);
      expect(function() {
        queue.enqueue(6);
      }).toThrow();
      expect(queue.dequeue()).toBe(81);
    });
  });
});
