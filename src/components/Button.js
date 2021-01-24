const Button = ({ task, handleMarkingButton }) => {
    const done = {
        color: 'red'
    }
    const notDone = {
        color: 'green'
    }

    if (task.done) {
        return <button style={done} onClick={() => handleMarkingButton(task.id)}>X</button>
    }

    return <button style={notDone} onClick={() => handleMarkingButton(task.id)}>V</button>
}

export default Button;