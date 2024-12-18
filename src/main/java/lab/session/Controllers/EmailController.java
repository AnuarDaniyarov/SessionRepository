package lab.session.Controllers;

import lab.session.Entities.EmailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/emails")
public class EmailController {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailController(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @PostMapping
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("your-email@example.com");
            message.setTo(emailRequest.getRecipient());
            message.setSubject(emailRequest.getSubject());
            message.setText(emailRequest.getMessage());

            mailSender.send(message);

            return ResponseEntity.ok("Email успешно отправлен!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ошибка при отправке email: " + e.getMessage());
        }
    }
}
