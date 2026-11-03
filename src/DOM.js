/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
  for (let i = 0; i < count; i++) {
    const element = document.createElement(tag);
    element.textContent = content;
    document.body.appendChild(element);
  }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
  if (level < 1) return null;

  function createNode(currentLevel) {
    const element = document.createElement('div');
    element.classList.add(`item_${currentLevel}`);

    if (currentLevel < level) {
      for (let i = 0; i < childrenCount; i++) {
        const child = createNode(currentLevel + 1);
        element.appendChild(child);
      }
    }

    return element;
  }

  return createNode(1);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
  const root = generateTree(2, 3);
  const targetNodes = Array.from(root.querySelectorAll('.item_2'));

  targetNodes.forEach(oldNode => {
    const newNode = document.createElement('section');
    newNode.className = oldNode.className;

    while (oldNode.firstChild) {
      newNode.appendChild(oldNode.firstChild);
    }

    if (oldNode.parentNode) {
      oldNode.parentNode.replaceChild(newNode, oldNode);
    }
  });

  return root;
}