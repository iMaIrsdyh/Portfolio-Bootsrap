/* Scroll reveal: adds 'revealed' class to elements with 'reveal' when they enter viewport */
document.addEventListener('DOMContentLoaded', function () {
	try {
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const revealEls = document.querySelectorAll('.reveal');

		if (prefersReduced || !('IntersectionObserver' in window)) {
			revealEls.forEach(el => el.classList.add('revealed'));
			return;
		}

		const observer = new IntersectionObserver((entries, obs) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('revealed');
					obs.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12 });

		revealEls.forEach(el => observer.observe(el));

		(function initContactForm() {
			try {
				const contactForm = document.getElementById('contactForm');
				if (!contactForm) return;

				const submitButton = document.getElementById('submitButton');
				const nameInput = document.getElementById('name');
				const emailInput = document.getElementById('email');
				const phoneInput = document.getElementById('phone');
				const subjectSelect = document.getElementById('subject');
				const messageInput = document.getElementById('message');
				const termsCheckbox = document.getElementById('terms');

				function showAlert(type, message = '') {
					const successAlert = document.getElementById('successAlert');
					const errorAlert = document.getElementById('errorAlert');
					const warningAlert = document.getElementById('warningAlert');

					// Hide all alerts first
					successAlert.classList.add('d-none');
					errorAlert.classList.add('d-none');
					warningAlert.classList.add('d-none');

					if (type === 'success') {
						successAlert.classList.remove('d-none');
					} else if (type === 'error') {
						document.getElementById('errorMessage').textContent = message;
						errorAlert.classList.remove('d-none');
					} else if (type === 'warning') {
						document.getElementById('warningMessage').textContent = message;
						warningAlert.classList.remove('d-none');
					}
				}

				function validateName() {
					const isValid = nameInput.value.trim().length >= 3;
					nameInput.classList.toggle('is-invalid', !isValid);
					nameInput.classList.toggle('is-valid', isValid);
					return isValid;
				}

				function validateEmail() {
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					const isValid = emailRegex.test(emailInput.value.trim());
					emailInput.classList.toggle('is-invalid', !isValid);
					emailInput.classList.toggle('is-valid', isValid);
					return isValid;
				}

				function validatePhone() {
                const phoneRegex = /^\+[1-9][0-9]{7,14}$/;
                const value = phoneInput.value.trim().replace(/\s|-/g, '');
                const isValid = phoneRegex.test(value);

                phoneInput.classList.toggle('is-invalid', !isValid);
                phoneInput.classList.toggle('is-valid', isValid);
                return isValid;
                  }


				function validateSubject() {
					const isValid = subjectSelect.value !== '';
					subjectSelect.classList.toggle('is-invalid', !isValid);
					subjectSelect.classList.toggle('is-valid', isValid);
					return isValid;
				}

				function validateMessage() {
					const isValid = messageInput.value.trim().length >= 10;
					messageInput.classList.toggle('is-invalid', !isValid);
					messageInput.classList.toggle('is-valid', isValid);
					return isValid;
				}

				function validateTerms() {
					const isValid = termsCheckbox.checked;
					termsCheckbox.classList.toggle('is-invalid', !isValid);
					termsCheckbox.classList.toggle('is-valid', isValid);
					return isValid;
				}

				function checkFormValidity() {
					const isValid = validateName() && validateEmail() && validatePhone() && validateSubject() && validateMessage() && validateTerms();
					submitButton.disabled = !isValid;
					return isValid;
				}

				nameInput.addEventListener('input', checkFormValidity);
				emailInput.addEventListener('input', checkFormValidity);
				phoneInput.addEventListener('input', checkFormValidity);
				subjectSelect.addEventListener('change', checkFormValidity);
				messageInput.addEventListener('input', checkFormValidity);
				termsCheckbox.addEventListener('change', checkFormValidity);

				contactForm.addEventListener('submit', function (e) {
					e.preventDefault();

					if (!checkFormValidity()) {
						showAlert('warning', 'Please fill all required fields correctly.');
						return;
					}

					const formData = {
						name: nameInput.value.trim(),
						email: emailInput.value.trim(),
						phone: phoneInput.value.trim(),
						subject: subjectSelect.value,
						message: messageInput.value.trim(),
						timestamp: new Date().toISOString()
					};

					// simulasi pengiriman 
					console.log('Form Data:', formData);

					submitButton.disabled = true;
					submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';

					setTimeout(() => {
						showAlert('success');

						contactForm.reset();
						contactForm.classList.remove('was-validated');
						[nameInput, emailInput, phoneInput, subjectSelect, messageInput, termsCheckbox].forEach(el => el.classList.remove('is-valid', 'is-invalid'));

						submitButton.disabled = true;
						submitButton.innerHTML = '<i class="bi bi-send me-2"></i>Send Message';

						setTimeout(() => document.getElementById('successAlert').classList.add('d-none'), 5000);
					}, 1500);
				});
			} catch (err) {
				console.error('Contact form init error:', err);
			}

			// penangan accordion yang ditampilkan untuk ikon pulsa dan keterampilan yang ditampilkan //
			const timelineAccordion = document.getElementById('timelineAccordion');
			if (timelineAccordion) {
				timelineAccordion.addEventListener('shown.bs.collapse', function (e) {
					const body = e.target.querySelector('.accordion-body');
					if (body) {
						body.classList.add('pulse');
						setTimeout(() => body.classList.remove('pulse'), 700);
					}
				});
			}

			// Ketika elemen yang ditampilkan ditampilkan, animasikan juga ikon keterampilan jika ada //
			const observer = new MutationObserver(mutations => {
				mutations.forEach(m => {
					m.addedNodes.forEach(n => {
						if (n.nodeType === 1 && n.classList.contains('revealed')) {
							const icons = n.querySelectorAll('.skill-icon');
							icons.forEach(ic => ic.classList.add('revealed'));
						}
					});
				});
			});
			const revEls = document.querySelectorAll('.reveal');
			revEls.forEach(el => observer.observe(el, { attributes: true, attributeFilter: ['class'] }));
		})();
	} catch (e) {

		console.error('Reveal script error:', e);
	}

	
	(function animateIntro() {
		try {
			const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			const title = document.getElementById('introTitle');
			const sub = document.getElementById('introSub');
			if (!title) return;

			const text = title.textContent.trim();
			
			title.innerHTML = '';
			const letters = [];
			for (let i = 0; i < text.length; i++) {
				const ch = text[i] === ' ' ? '\u00A0' : text[i];
				const span = document.createElement('span');
				span.className = 'intro-letter';
				span.textContent = ch;
				title.appendChild(span);
				letters.push(span);
			}

			if (prefersReduced) {
				letters.forEach(s => s.classList.add('visible'));
				if (sub) sub.classList.add('visible');
				return;
			}

			// animate sub then letters
			if (sub) {
				setTimeout(() => sub.classList.add('visible'), 100);
			}
			letters.forEach((s, i) => {
				setTimeout(() => s.classList.add('visible'), 140 + i * 35);
			});
		} catch (err) {
			// non-critical
			console.error('Intro animation error:', err);
		}
	})();
});
