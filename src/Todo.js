import React, { useState, useEffect } from 'react'
import './style.scss'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import { TiEdit } from 'react-icons/ti'

const Todo = () => {
	// states

	const [taskVal, setTaskVal] = useState('')

	const [curEditItem, setCurEditItem] = useState('')
	const [toggleBtn, setToggleBtn] = useState(false)

	// getting time
	let time = new Date().toLocaleTimeString()
	const [curTime, setCutTime] = useState(time)

	const updateTime = () => {
		time = new Date().toLocaleTimeString()
		setCutTime(time)
	}

	setInterval(updateTime, 1000)

	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	]
	// getting day
	let day = new Date().getDay()
	const [curDay, setCurDay] = useState(days[day])

	const updateDay = () => {
		day = new Date().getDay()
		setCurDay(days[day])
	}

	setInterval(updateDay, 1000)

	// getting from local storge
	const getLocal = () => {
		const list = localStorage.getItem('todo')

		if (list) {
			return JSON.parse(list)
		} else {
			return []
		}
	}
	const [items, setItems] = useState(getLocal)
	// adding item with id
	const addItem = () => {
		if (!taskVal) {
			alert('no entry')
		} else if (taskVal && toggleBtn) {
			setItems(
				items.map((curElem) => {
					if (curElem.id === curEditItem) {
						return { ...curElem, name: taskVal }
					}
					return curElem
				})
			)
			setTaskVal('')
			setCurEditItem(null)
			setToggleBtn(false)
		} else {
			const myItem = {
				id: new Date().getTime().toString(),
				name: taskVal,
			}

			setItems([...items, myItem])
			setTaskVal('')
		}
	}
	// dlt items
	const deleteItem = (index) => {
		const updatedItems = items.filter((curElem) => {
			return curElem.id !== index
		})
		setItems(updatedItems)
	}
	// edit items
	const editItem = (index) => {
		const updated_edit = items.find((curElem) => {
			return curElem.id === index
		})
		setCurEditItem(index)
		setTaskVal(updated_edit.name)
		setToggleBtn(true)
	}
	// storing in local storage
	useEffect(() => {
		localStorage.setItem('todo', JSON.stringify(items))
	}, [items])

	return (
		<>
			<div className='timeDay'>
				<span className='time'>{curTime},</span>
				<span className='day'>{curDay}</span>
			</div>
				<div className={`input`}>
					<input
						type='text'
						placeholder='Whatcha gonna do today ??'
						className='task_input'
						value={taskVal}
						onChange={(event) => setTaskVal(event.target.value)}
					/>
					{toggleBtn ? (
						<div className='btn'>
							<FiCheck onClick={addItem} color="#41f500" size={18} />
						</div>
					) : (
						<div className='btn'>
							<FiArrowRight onClick={addItem} color="#41f500" size={18}/>
						</div>
					)}
				</div>
			
			<div className='tasks'>
				{items.map((curElem) => {
					return (
						<>
							<div className='eachElement' key={curElem.id}>
								<div className='task'>{curElem.name}</div>
								<div className='sidebar'>
									<div className='btn'>
										<TiEdit size={16} onClick={() => editItem(curElem.id)} />
									</div>
									<div className='btn'>
										<AiOutlineDelete
											size={16}
											onClick={() => deleteItem(curElem.id)}
										/>
									</div>
								</div>
							</div>
							<div className='divider'></div>
						</>
					)
				})}
			</div>
		</>
	)
}

export default Todo
