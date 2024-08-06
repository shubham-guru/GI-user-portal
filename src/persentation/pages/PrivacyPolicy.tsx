import { Col, Row, Typography } from 'antd'
import { useEffect } from 'react'

const PrivacyPolicy = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

  return (
    <Row>
        <Col style={{marginBottom: "2%", padding: "2vmax"}} className="glassmorphism-effect">
            <Typography.Title className="pp-title-text">Privacy Policy</Typography.Title>
            <Typography.Text>
                Guru Internationals is committed to protecting your privacy. 
                This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you visit 
                our website guruinternationals.com or engage with our services.
            </Typography.Text>

            <Typography.Title className="pp-title-text">Information We Collect</Typography.Title>
            <Typography.Text>
                We may collect personal information from you such as your name, email address, postal address, phone number, 
                and payment information when you interact with our Site or use our services. This information is collected when you voluntarily submit it to us or provide it through the use of our services.
            </Typography.Text>

            <Typography.Title className="pp-title-text">How We Use Your Information</Typography.Title>
            <Typography.Text>
                We may use the information we collect from you to:
                <ul>
                    <li>Provide and personalize our services</li>
                    <li>Process transactions</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send you promotional emails about new products, special offers, or other information we think you may find interesting</li>
                    <li>Improve our website and services</li>
                </ul>
            </Typography.Text>


            <Typography.Title className="pp-title-text">How We Protect Your Information</Typography.Title>
            <Typography.Text>
                We are committed to ensuring the security of your personal information. We have implemented appropriate technical and 
                organizational measures to safeguard and secure the information we collect online.
            </Typography.Text>

            <Typography.Title className="pp-title-text">Disclosure of Your Information</Typography.Title>
            <Typography.Text>
                We may share your personal information with third-party service providers who assist us in providing and managing our services. 
                These third parties are obligated to use your information solely for the purpose of providing the services requested by us 
                and are contractually bound to keep your information confidential. <br /> We may also disclose your information in the following circumstances:
                <ul>
                    <li>To comply with legal obligations</li>
                    <li>To protect and defend our rights or property</li>
                    <li>To prevent or investigate possible wrongdoing in connection with the Site or our services</li>
                    <li>To protect the personal safety of users of the Site or the public</li>
                </ul>
            </Typography.Text>

            <Typography.Title className="pp-title-text">Shipping Policy</Typography.Title>
            <Typography.Text>
                The minimum and maximum timelines for shipping are 10 to 20 working days, depending on your location.
            </Typography.Text>

            <Typography.Title className="pp-title-text">Changes to This Privacy Policy</Typography.Title>
            <Typography.Text>
            We reserve the right to update or change our Privacy Policy at any time. Any changes we make to our Privacy Policy will be 
            posted on this page with a revised effective date.
            </Typography.Text>

            <Typography.Title className="pp-title-text">Terms & Conditions</Typography.Title>
            <Typography.Text>
            We may collect personal information from you such as your name, 
            email address, postal address, phone number, and payment information 
            when you interact with our Site or use our services. This information 
            is collected when you voluntarily submit it to us or provide it 
            through the use of our services. Please note that we do not have a 
            return policy for products purchased from our food brand.
            </Typography.Text>

            <Typography.Title className="pp-title-text">Contact Us</Typography.Title>
            <Typography.Text>
                If you have any questions or concerns about our Privacy Policy, please contact us at 
                <i> 
                   <Typography.Link href="mailto:guruinternationals0207@gmail.com"> guruinternationals0207@gmail.com</Typography.Link> 
                </i> or
                <i> 
                   <Typography.Link href="tel:+91-8955288660"> +91-8955288660 </Typography.Link> 
                </i>
            </Typography.Text>

            <Typography.Title className="pp-title-text">Operating Address</Typography.Title>
            <Typography.Text>
                We are operating all our operations from the address : 
                <Typography.Link target="_blank" href="https://maps.app.goo.gl/oxDpv6V3z7MefuCi7"> Sector 11, Hiran Magri, Udaipur, Rajasthan, India, 313001 </Typography.Link>
            </Typography.Text>

        </Col>
    </Row>
  )
}

export default PrivacyPolicy