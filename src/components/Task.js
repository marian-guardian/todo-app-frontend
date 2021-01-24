import Button from './Button'


const Task = ({ task, handleMarkingButton, handleDeleteBtn }) => {
    
    // Styles
    const strikethrough = {
        textDecoration: 'line-through'
    }

    const deleteBtn = {
        color: 'red',
        backgroundColor: 'black'
    }

    return (
        <tr>
            <td>
                <button style={deleteBtn} onClick={() => handleDeleteBtn(task.id)}>delete</button>
            </td>
            {task.done
                ? <td style={strikethrough}>{task.task}</td>
                : <td>{task.task}</td>
            }
            <td>
                <Button task={task} handleMarkingButton={handleMarkingButton} handleDeleteBtn={handleDeleteBtn} />
            </td>
        </tr>
    )
}

export default Task;