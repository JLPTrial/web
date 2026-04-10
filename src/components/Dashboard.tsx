import { useState } from 'react'
import Statistics from './Statistics'

export default function Dashboard() {
	return (
		<div className='w-100  bg-yellow-500 p-2 rounded-md'>
			Dashboard
			<Statistics />
		</div>
	)
}
