import React, { useEffect, useState } from 'react'

interface CountdownClockProps {
	targetDate: Date;
}

const CountdownClock = ({ targetDate }: CountdownClockProps) => {
	const calculateTimeLeft = () => {
		const now = new Date()
		const difference = targetDate.getTime() - now.getTime()
		return Math.max(difference, 0)
	}
	
	const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft())
	
	useEffect(() => {
		// Set up the interval to tick down every second
		const intervalId = setInterval(() => {
			setTimeLeft(calculateTimeLeft())
		}, 1000)
		
		// Clean up the interval on unmount
		return () => clearInterval(intervalId)
	}, [targetDate])
	
	return (
		<div>
				<span className="countdown font-mono text-2xl">
					<span style={ { '--value': Math.floor(timeLeft / (1000 * 60 * 60)) % 24 } as any }></span>h
					<span style={ { '--value': Math.floor(timeLeft / 1000 / 60) % 60 } as any }></span>m
					<span style={ { '--value': Math.floor(timeLeft / 1000) % 60 } as any }></span>s
				</span>
		</div>
	)
}

export default CountdownClock
