import stripe
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Secret key for Stripe
stripe.api_key = "sk_test_51RMiyQAyRxmgsiXkhTmfa2IfutL9wzgITBtsR6duB2EV9e3wejBi6gJLv9cjJk3U3NbCnhcKDHE3KDJDCEoGB7wc00M4vuUB52"

@app.route('/api/checkout', methods=['POST'])
def checkout():
    try:
        data = request.get_json()
        payment_method_id = data['token']['id']  # Comes from frontend
        order = data['order']
        amount = int(order['total'] * 100)  # Convert dollars to cents

        # Create a PaymentIntent
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd',
            payment_method=payment_method_id,
            confirmation_method='manual',
            confirm=True,
        )

        # Check for 3D Secure Authentication required
        if intent.status == 'requires_action' and intent.next_action.type == 'use_stripe_sdk':
            return jsonify({
                'requires_action': True,
                'payment_intent_client_secret': intent.client_secret
            })
        elif intent.status == 'succeeded':
            return jsonify({'success': True})
        else:
            # Handle unexpected status
            return jsonify({'error': f"Unexpected status: {intent.status}"}), 400

    except stripe.error.CardError as e:
        return jsonify({'error': e.user_message}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
