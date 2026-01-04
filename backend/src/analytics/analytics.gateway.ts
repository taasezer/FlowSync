
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AnalyticsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly analyticsService: AnalyticsService) {
    // Simulate activity updates for now
    setInterval(() => {
      const mockLevel = Math.floor(Math.random() * 30) + 60; // 60-90
      this.server.emit('activity_level', mockLevel);
    }, 5000);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createAnalytics')
  create(@MessageBody() createAnalyticsDto: CreateAnalyticsDto) {
    return this.analyticsService.create(createAnalyticsDto);
  }

  @SubscribeMessage('findAllAnalytics')
  findAll() {
    return this.analyticsService.findAll();
  }

  @SubscribeMessage('findOneAnalytics')
  findOne(@MessageBody() id: string) {
    return this.analyticsService.findOne(id);
  }

  @SubscribeMessage('updateAnalytics')
  update(@MessageBody() updateAnalyticsDto: UpdateAnalyticsDto) {
    return this.analyticsService.update(updateAnalyticsDto.id, updateAnalyticsDto);
  }

  @SubscribeMessage('removeAnalytics')
  remove(@MessageBody() id: number) {
    return this.analyticsService.remove(id);
  }
}
