export function setMatrix(matrix, v, x, y) {
    var i = x;
    if (arguments.length === 4) i = i*4 + y;
    matrix[i] = v;
}

export function matrixAt(matrix, x, y) {
    var i = x;
    if (arguments.length === 3) i = i*4 + y;
    return matrix[i];
}

export function getRandomNum(matrix, max, compareTo) {
    var index=Math.floor(Math.random() * max);
    while (compareTo && index === compareTo) {
        index=Math.floor(Math.random() * max);
    }
    while (matrix[index]) {
        index = index > 15 ? 0 : index + 1;
    }
    // 2 or 4 here
    var num = Math.floor(Math.random() * 10);
    num = num > 8 ? 4 : 2;
    return {num, index};
}

export function isFull(matrix) {
    for (var i = 0; i < 16; i++) {
        if (matrix[i] === 0) return false;
    }
    return true;
}

export function isEqual(matrix1, matrix2) {
    if (matrix1.length !== matrix2.length) return true;
    for (var i = 0; i < matrix1.length; i++) {
        if (matrix1[i] !== matrix2[i]) return true;
    }
    return false;
}

export function move(matrix, action, score_) {
    const matrix_ = matrix.slice();

    if (action === 0) { // up
      for (var y = 0; y < 4; y++) {
        var contents = [];
        for (var x = 0; x < 4; x++) {
          var curr_v = matrixAt(matrix_, x, y);
          if (curr_v) {
            contents.push(curr_v);
            setMatrix(matrix_, 0, x, y);
          }
        }
        for (var i = 0, x = 0; i < contents.length; i++) {
          if (i < contents.length - 1 && contents[i] === contents[i+1]) {
            contents[i] *= 2;
            contents[i+1] = 0;
            score_ += contents[i];
          }
          if (contents[i]) {
            setMatrix(matrix_, contents[i], x, y);
            x++;
          }
        } 
      }
    } else if (action === 1) { // right
      for (var x = 3; x >= 0; x--) {
        var contents = [];
        for (var y = 3; y >= 0; y--) {
          var curr_v = matrixAt(matrix_, x, y);
          if (curr_v) {
            contents.push(curr_v);
            setMatrix(matrix_, 0, x, y);
          }
        }
        for (var i = 0, y = 3; i < contents.length; i++) {
          if (i < contents.length - 1 && contents[i] === contents[i+1]) {
            contents[i] *= 2;
            contents[i+1] = 0;
            score_ += contents[i];
          }
          if (contents[i]) {
            setMatrix(matrix_, contents[i], x, y);
            y--;
          }
        } 
      }
    } else if (action === 2) { // down 
      for (var y = 3; y >= 0; y--) {
        var contents = [];
        for (var x = 3; x >= 0; x--) {
          var curr_v = matrixAt(matrix_, x, y);
          if (curr_v) {
            contents.push(curr_v);
            setMatrix(matrix_, 0, x, y);
          }
        }
        for (var i = 0, x = 3; i < contents.length; i++) {
          if (i < contents.length - 1 && contents[i] === contents[i+1]) {
            contents[i] *= 2;
            contents[i+1] = 0;
            score_ += contents[i];
          }
          if (contents[i]) {
            setMatrix(matrix_, contents[i], x, y);
            x--;
          }
        } 
      }
    } else if (action === 3) { // left
      for (var x = 0; x < 4; x++) {
        var contents = [];
        for (var y = 0; y < 4; y++) {
          var curr_v = matrixAt(matrix_, x, y);
          if (curr_v) {
            contents.push(curr_v);
            setMatrix(matrix_, 0, x, y);
          }
        }
        for (var i = 0, y = 0; i < contents.length; i++) {
          if (i < contents.length - 1 && contents[i] === contents[i+1]) {
            contents[i] *= 2;
            contents[i+1] = 0;
            score_ += contents[i];
          }
          if (contents[i]) {
            setMatrix(matrix_, contents[i], x, y);
            y++;
          }
        } 
      }
    }

    var full = isFull(matrix_);
    var canMove = isEqual(matrix, matrix_);

    return {matrix_, score_, full, canMove};
}
