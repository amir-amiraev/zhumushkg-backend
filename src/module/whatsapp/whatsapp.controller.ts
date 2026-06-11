import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { WhatsappService } from './whatsapp.service';
import * as QRCode from 'qrcode';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Get('qr')
  async getQr(@Res() res: Response) {
    const qr = this.whatsappService.getQr();

    if (!qr) {
      return res.send('<h2>QR не готов или WhatsApp уже подключён</h2>');
    }

    const imageUrl = await QRCode.toDataURL(qr);
    return res.send(`
      <html>
        <body style="display:flex;justify-content:center;align-items:center;height:100vh;background:#111">
          <img src="${imageUrl}" style="width:300px;height:300px"/>
        </body>
      </html>
    `);
  }
}
