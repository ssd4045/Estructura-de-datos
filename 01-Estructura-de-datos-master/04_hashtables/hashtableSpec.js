describe('HashTable', function() {
  var hashTable;

  beforeEach(function() {
    hashTable = new HashTable();
  });

  it('deberia tener 35 buckets', function() {
    expect(hashTable.numBuckets).toBe(35);
  });

  it('deberia tener metodos `set`, `get`, y `hasKey`', function() {
    expect(typeof hashTable.set).toBe('function');
    expect(typeof hashTable.get).toBe('function');
    expect(typeof hashTable.hasKey).toBe('function');
  });

  it('deberia `hash` correctament', function() {
    // esta funcion hasheadora deberia sumar los key code de las letras de la palabra,
    // y hacer el mod de ese numero por el numero de buckets .
    expect(hashTable.hash('foo')).toBe(9);
    expect(hashTable.hash('this is a key')).toBe(27);
    expect(hashTable.hash('what about this one')).toBe(13);
  });

  it('deberia guardar y buscar valores por key', function() {
    hashTable.set('key1', 'val1');
    hashTable.set('key2', 'val2');
    hashTable.set('this is a very different string', 44.4);
    expect(hashTable.get('key1')).toBe('val1');
    expect(hashTable.get('key2')).toBe('val2');
    expect(hashTable.get('this is a very different string')).toBe(44.4);
  });

  it('deberia devolver un error cuando el key no es un string', function() {
    expect(function() {
      hashTable.set(false, 'hi');
    }).toThrowError(TypeError, 'Keys must be strings');
  });

  it('deberia manejar colisiones', function() {
    hashTable.set('foo', 'bar1');
    hashTable.set('ofo', 'bar2');
    expect(hashTable.get('ofo')).toBe('bar2');
    expect(hashTable.get('foo')).toBe('bar1');
  });

  it('deberia sobreescribir keys', function() {
    hashTable.set('foo', 'bar1');
    hashTable.set('foo', 'bar2');
    expect(hashTable.get('foo')).toBe('bar2');
  });

  it('deberia devolver booleanos para el metodo #hasKey', function() {
    hashTable.set('foobar', 'fluf cats');
    expect(hashTable.hasKey('foobar')).toBe(true);
    expect(hashTable.hasKey('raboof')).toBe(false);
  });

});
