(module
  ;; функция square: принимает целое i32, возвращает его квадрат
  (func (export "square") (param i32) (result i32)
    local.get 0
    local.get 0
    i32.mul))