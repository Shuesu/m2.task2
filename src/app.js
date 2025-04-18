import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex ✓
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала ✓
	const handleBack = () => {
		if (activeIndex > 0) {
			setActiveIndex((prev) => prev - 1)
		}
	};
	const handleNext = () => { setActiveIndex((prev) => prev + 1) };
	const handleReset = () => { setActiveIndex(0) };

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем ✓
	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{/* Для получения активного контента использйте steps и activeIndex  */}
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map(({ title, id }, index) => (
							<li
								key={id}
								className={
									styles['steps-item'] +
									(index === activeIndex ? ` ${styles.active}` : '') +
									(index < activeIndex ? ` ${styles.done}` : '')
								}>

								<button className={styles['steps-item-button']} onClick={() => setActiveIndex(index)}>{index + 1}</button>
								{' '}
								{title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button className={styles.button} onClick={handleBack} disabled={isFirstStep}>Назад</button>
						<button className={styles.button} onClick={() => isLastStep ? handleReset() : handleNext()}>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
