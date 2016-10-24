import React, { PropTypes } from 'react'
import Todo from './Todo'

const TodoList = ({ todos, serverContext, pre, config, onTodoClick }) => (
  <div>
    <ul>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
        />
      )}
    </ul>
    <div>
      <p>{serverContext.test}</p>
      <p>{pre.preTest}</p>
      <p>{config.honeybadger}</p>
    </div>
  </div>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList
