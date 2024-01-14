import React, { useEffect, useState } from 'react'

const PasswordStrengthIndicator = ({ password }: { password: string }) => {
	const [strength, setStrength] = useState(0);
	const [barColour, setBarColour] = useState('bg-red-500');
	const [strengthText, setStrengthText] = useState('Weak');
	
	const calculateStrength = (password: string) => {
		if(!password) return 0;
		
		let strength = 0;
		const lengthWeight = 0.25;
		const typeWeight = 0.25;
		const specialCharWeight = 0.25;
		const numberWeight = 0.25;
		
		if (password.length >= 8) strength += lengthWeight;
		
		// Uppercase, Lowercase, Number, Special Character Check
		if (/[a-z]/.test(password)) strength += typeWeight;
		if (/[A-Z]/.test(password)) strength += typeWeight;
		if (/[0-9]/.test(password)) strength += numberWeight;
		if (/[^A-Za-z0-9]/.test(password)) strength += specialCharWeight;
		
		return Math.min(Math.floor(strength * 100), 100);
	};
	
	useEffect(() => {
		setStrength(calculateStrength(password))
	}, [password])
	
	useEffect(() => {
		const calculateStrengthBarColor = () => {
			if (strength <= 0) return '';
			if (strength < 33) return 'progress-error';
			if (strength < 50) return 'progress-warning';
			if (strength < 66) return 'progress-warning';
			return 'progress-success';
		};
		
		const calculateStrengthText = () => {
			if (strength <= 0) return 'Enter a Password';
			if (strength < 33) return 'Weak';
			if (strength < 50) return 'Reasonable';
			if (strength < 66) return 'Strong';
			return 'Very Strong';
		}
		
		setBarColour(calculateStrengthBarColor())
		setStrengthText(calculateStrengthText())
	}, [strength])
	
	return (
		<div className={'password-strength-indicator'}>
			<progress className={`progress w-full ${barColour} password-strength`} value={strength} max="100"></progress>
			{ strengthText }
		</div>
	);
};

export default PasswordStrengthIndicator;