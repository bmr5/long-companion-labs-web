<?php
/**
 * Pay for order form - Custom Genesis Peptides Design
 *
 * This file should be copied to:
 * wp-content/themes/genesispeptides/woocommerce/checkout/form-pay.php
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 8.2.0
 */

defined( 'ABSPATH' ) || exit;

$totals = $order->get_order_item_totals();
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
    <style>
        /* Reset */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* Hide any theme elements that leak through */
        body > header, body > footer, .site-header, .site-footer,
        .main-navigation, .storefront-breadcrumb, #masthead,
        .storefront-header-container, .header-widget-region,
        .footer-widgets, .site-info, .woocommerce-breadcrumb,
        .entry-header, .page-title { display: none !important; }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
            background: linear-gradient(180deg, #fafaf9 0%, #f5f5f4 50%, #fafaf9 100%);
            min-height: 100vh;
            color: #1c1917;
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
        }

        /* Header - same width as cards */
        .gp-header {
            max-width: 520px;
            margin: 0 auto;
            padding: 2rem 1.5rem 1.25rem;
        }
        .gp-header-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: white;
            padding: 1.125rem 1.5rem;
            border-radius: 16px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
        }
        .gp-logo,
        .gp-logo:visited,
        .gp-logo:hover,
        a.gp-logo {
            font-family: Georgia, 'Times New Roman', serif !important;
            font-size: 1.75rem !important;
            color: #1c1917 !important;
            text-decoration: none !important;
            letter-spacing: -0.02em !important;
        }
        .gp-secure {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8125rem;
            color: #a8a29e;
            font-weight: 500;
            letter-spacing: 0.01em;
        }
        .gp-secure svg { width: 15px; height: 15px; stroke-width: 1.5; }

        /* Container */
        .gp-container {
            max-width: 520px;
            margin: 0 auto;
            padding: 0 1.5rem 3.5rem;
        }

        /* Cards */
        .gp-card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 1.25rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
        }
        .gp-card-header {
            padding: 1.125rem 1.5rem;
            border-bottom: 1px solid #f5f5f4;
        }
        .gp-card-header h2 {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #78716c;
            font-weight: 600;
        }

        /* Order Items */
        .gp-order-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.125rem 1.5rem;
            border-bottom: 1px solid #f7f7f6;
        }
        .gp-order-item:last-of-type { border-bottom: none; }
        .gp-item-info { display: flex; align-items: baseline; gap: 0.625rem; }
        .gp-item-name { font-size: 0.9375rem; color: #1c1917; font-weight: 500; }
        .gp-item-qty { font-size: 0.8125rem; color: #a8a29e; }
        .gp-item-price {
            font-size: 0.9375rem;
            font-weight: 600;
            color: #1c1917;
            font-feature-settings: "tnum";
        }

        /* Totals */
        .gp-totals {
            background: #fafaf9;
            padding: 1.125rem 1.5rem;
        }
        .gp-total-row {
            display: flex;
            justify-content: space-between;
            padding: 0.375rem 0;
            font-size: 0.9375rem;
            color: #57534e;
        }
        .gp-total-row.gp-final {
            border-top: 1px solid #e7e5e4;
            margin-top: 0.625rem;
            padding-top: 1rem;
            font-size: 1.1875rem;
            font-weight: 600;
            color: #1c1917;
        }
        .gp-total-value {
            font-weight: 500;
            font-feature-settings: "tnum";
        }
        .gp-final .gp-total-value { font-weight: 600; }

        /* Payment Methods */
        .gp-payment-methods {
            list-style: none;
        }
        .gp-payment-methods .wc_payment_method {
            padding: 1.125rem 1.5rem;
            border-bottom: 1px solid #f5f5f4;
        }
        .gp-payment-methods .wc_payment_method:last-child {
            border-bottom: none;
        }
        .gp-payment-methods .wc_payment_method > label {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 0.875rem !important;
            cursor: pointer;
            font-size: 0.9375rem;
            font-weight: 500;
            color: #1c1917;
        }
        .gp-payment-methods input[type="radio"] {
            width: 20px !important;
            height: 20px !important;
            accent-color: #1c1917;
            cursor: pointer;
            margin: 0 !important;
            flex-shrink: 0;
        }
        .gp-payment-methods .payment_box {
            margin: 1rem 0 0 0;
            padding: 1.25rem;
            background: #fafaf9;
            border: 1px solid #e7e5e4;
            border-radius: 12px;
            font-size: 0.875rem;
            color: #57534e;
            line-height: 1.6;
        }
        .gp-payment-methods .payment_box p { margin-bottom: 1rem; }
        .gp-payment-methods .payment_box p:last-child { margin-bottom: 0; }
        .gp-payment-methods .payment_box fieldset { border: none; }
        .gp-payment-methods .payment_box label {
            display: block;
            font-size: 0.8125rem;
            color: #78716c;
            margin-bottom: 0.5rem;
            font-weight: 500;
        }
        .gp-payment-methods .payment_box input[type="text"],
        .gp-payment-methods .payment_box input[type="tel"],
        .gp-payment-methods .payment_box input[type="number"],
        .gp-payment-methods .payment_box select {
            width: 100%;
            padding: 0.875rem 1rem;
            border: 1px solid #d6d3d1;
            border-radius: 10px;
            font-size: 1rem;
            margin-bottom: 0.875rem;
            background: white;
            color: #1c1917;
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .gp-payment-methods .payment_box input:focus,
        .gp-payment-methods .payment_box select:focus {
            outline: none;
            border-color: #1c1917;
            box-shadow: 0 0 0 3px rgba(28,25,23,0.08);
        }
        .gp-payment-methods .payment_box input::placeholder {
            color: #a8a29e;
        }

        /* Submit Button */
        .gp-submit-wrap {
            padding: 1.5rem;
            background: linear-gradient(to bottom, #fafaf9, #f5f5f4);
            border-top: 1px solid #e7e5e4;
        }
        .gp-submit-btn {
            width: 100%;
            background: #1c1917;
            color: white;
            border: none;
            padding: 1.125rem 2rem;
            font-size: 1rem;
            font-weight: 500;
            border-radius: 9999px;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(28,25,23,0.15);
            letter-spacing: 0.01em;
        }
        .gp-submit-btn:hover {
            background: #292524;
            box-shadow: 0 4px 12px rgba(28,25,23,0.2);
            transform: translateY(-1px);
        }
        .gp-submit-btn:active {
            transform: scale(0.98) translateY(0);
            box-shadow: 0 2px 6px rgba(28,25,23,0.15);
        }

        /* Footer */
        .gp-footer-note {
            text-align: center;
            margin-top: 2rem;
            font-size: 0.8125rem;
        }
        .gp-footer-note a {
            color: #78716c;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s;
        }
        .gp-footer-note a:hover { color: #1c1917; }

        /* Trust badges */
        .gp-trust {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid #e7e5e4;
        }
        .gp-trust-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.75rem;
            color: #a8a29e;
        }
        .gp-trust-item svg { width: 14px; height: 14px; }

        /* WooCommerce notices */
        .woocommerce-error, .woocommerce-message, .woocommerce-info {
            padding: 1rem 1.25rem;
            margin-bottom: 1.25rem;
            border-radius: 10px;
            font-size: 0.875rem;
            list-style: none;
        }
        .woocommerce-error {
            background: #fef2f2;
            border: 1px solid #fecaca;
            color: #991b1b;
        }
        .woocommerce-message {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            color: #166534;
        }
        .woocommerce-info {
            background: #fafaf9;
            border: 1px solid #e7e5e4;
            color: #57534e;
        }

        /* Responsive */
        @media (max-width: 480px) {
            .gp-header { padding: 1.5rem 1rem 0; }
            .gp-container { padding: 0 1rem 2.5rem; }
            .gp-card, .gp-header-inner { border-radius: 12px; }
            .gp-order-item, .gp-card-header, .gp-totals,
            .gp-payment-methods .wc_payment_method {
                padding-left: 1.25rem;
                padding-right: 1.25rem;
            }
        }
    </style>
</head>
<body class="woocommerce-order-pay">

<header class="gp-header">
    <div class="gp-header-inner">
        <a href="<?php echo esc_url( home_url() ); ?>" class="gp-logo">Genesis</a>
        <div class="gp-secure">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Secure Checkout
        </div>
    </div>
</header>

<div class="gp-container">

    <?php wc_print_notices(); ?>

    <form id="order_review" method="post">

        <!-- Order Summary -->
        <div class="gp-card">
            <div class="gp-card-header">
                <h2>Order Summary</h2>
            </div>
            <div class="gp-card-body">
                <?php if ( count( $order->get_items() ) > 0 ) : ?>
                    <?php foreach ( $order->get_items() as $item_id => $item ) : ?>
                        <?php if ( ! apply_filters( 'woocommerce_order_item_visible', true, $item ) ) continue; ?>
                        <div class="gp-order-item">
                            <div class="gp-item-info">
                                <span class="gp-item-name"><?php echo wp_kses_post( $item->get_name() ); ?></span>
                                <span class="gp-item-qty">× <?php echo esc_html( $item->get_quantity() ); ?></span>
                            </div>
                            <span class="gp-item-price"><?php echo $order->get_formatted_line_subtotal( $item ); ?></span>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>

                <?php if ( $totals ) : ?>
                    <div class="gp-totals">
                        <?php
                        $total_count = count( $totals );
                        $i = 0;
                        foreach ( $totals as $key => $total ) :
                            $i++;
                            $is_final = ( $i === $total_count );
                        ?>
                            <div class="gp-total-row <?php echo $is_final ? 'gp-final' : ''; ?>">
                                <span class="gp-total-label"><?php echo wp_kses_post( $total['label'] ); ?></span>
                                <span class="gp-total-value"><?php echo wp_kses_post( $total['value'] ); ?></span>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>

        <!-- Payment Methods -->
        <div class="gp-card">
            <div class="gp-card-header">
                <h2>Payment Method</h2>
            </div>
            <div class="gp-card-body">
                <?php if ( $order->needs_payment() ) : ?>
                    <ul class="gp-payment-methods wc_payment_methods payment_methods methods">
                        <?php
                        if ( ! empty( $available_gateways ) ) {
                            foreach ( $available_gateways as $gateway ) {
                                wc_get_template( 'checkout/payment-method.php', array( 'gateway' => $gateway ) );
                            }
                        } else {
                            echo '<li style="padding: 1.5rem; color: #78716c; text-align: center;">No payment methods available.</li>';
                        }
                        ?>
                    </ul>
                <?php endif; ?>

                <div class="gp-submit-wrap">
                    <input type="hidden" name="woocommerce_pay" value="1" />

                    <?php do_action( 'woocommerce_pay_order_before_submit' ); ?>

                    <button type="submit" class="gp-submit-btn" id="place_order">
                        Complete Payment
                    </button>

                    <?php do_action( 'woocommerce_pay_order_after_submit' ); ?>

                    <?php wp_nonce_field( 'woocommerce-pay', 'woocommerce-pay-nonce' ); ?>
                </div>
            </div>
        </div>

    </form>

    <div class="gp-trust">
        <div class="gp-trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Secure Payment
        </div>
        <div class="gp-trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            Fast Shipping
        </div>
    </div>

    <p class="gp-footer-note">
        <a href="<?php echo esc_url( home_url() ); ?>">← Return to Genesis Peptides</a>
    </p>
</div>

<?php wp_footer(); ?>
</body>
</html>
