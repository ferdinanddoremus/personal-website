# Deployment with Kamal

This project is configured to deploy using [Kamal](https://kamal-deploy.org/), a simple deployment tool that uses Docker.

## Prerequisites

1. **Install Kamal**:
   ```bash
   gem install kamal
   ```

2. **Install Docker** on your local machine and target server

3. **Server Requirements**:
   - Linux server with Docker installed
   - SSH access to the server
   - Domain name pointing to your server (optional, for SSL)

## Setup

1. **Configure your deployment**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update:
   - `YOUR_SERVER_IP`: Your server's IP address
   - `KAMAL_REGISTRY_PASSWORD`: Your Docker Hub password
   - Other environment variables as needed

2. **Update `config/deploy.yml`**:
   - Replace `YOUR_SERVER_IP` with your actual server IP
   - Replace `YOUR_DOCKER_USERNAME` with your Docker Hub username
   - Replace `your-domain.com` with your actual domain
   - Update SSH user and key path if different

3. **Setup SSH keys**:
   ```bash
   ssh-copy-id deploy@your-server-ip
   ```

## Deployment Commands

### Initial Setup (run once)
```bash
npm run deploy:setup
```
This will:
- Install Docker on the server (if needed)
- Set up the application directory structure
- Configure the proxy (Traefik)
- Set up SSL certificates (if domain is configured)

### Deploy
```bash
npm run deploy
```
This will:
- Build the Docker image locally
- Push it to the registry
- Deploy to your server
- Run health checks

### Other Useful Commands

```bash
# Check deployment status
npm run status

# View application logs
npm run logs

# Rollback to previous version
npm run deploy:rollback

# Access application console
npm run console
```

## Configuration Details

### Dockerfile
- Multi-stage build for optimized image size
- Non-root user for security
- Health check endpoint
- Production-ready Node.js setup

### Kamal Configuration
- **Service**: `personal-website`
- **Health Check**: HTTP check on `/` endpoint
- **SSL**: Automatic Let's Encrypt certificates
- **Proxy**: Traefik for load balancing and SSL termination
- **Logging**: JSON file driver with rotation
- **Security**: Non-root container execution

### Environment Variables
- `NODE_ENV=production`
- `PORT=3000`
- Custom secrets via `.env` file

## Troubleshooting

### Common Issues

1. **SSH Connection Failed**:
   - Ensure SSH keys are properly configured
   - Check that the `deploy` user exists on the server
   - Verify SSH access: `ssh deploy@your-server-ip`

2. **Docker Build Failed**:
   - Check Dockerfile syntax
   - Ensure all dependencies are properly specified
   - Verify build context with `.dockerignore`

3. **Health Check Failed**:
   - Check application starts correctly with `npm start`
   - Verify port 3000 is exposed and accessible
   - Review application logs with `npm run logs`

4. **SSL Certificate Issues**:
   - Ensure domain is properly configured and pointing to server
   - Check DNS propagation
   - Verify port 80/443 are open on server

### Debugging

```bash
# SSH into the server
ssh deploy@your-server-ip

# Check running containers
docker ps

# View container logs
docker logs personal-website

# Check Traefik status
docker ps | grep traefik
```

## Security Considerations

- Application runs as non-root user in container
- Minimal Docker image with only necessary dependencies
- Environment variables for sensitive data
- HTTPS enforced via Traefik proxy
- Regular security updates via Kamal deployments

## Monitoring

The deployment includes:
- Health check endpoint for application monitoring
- Log rotation to prevent disk space issues
- Automatic container restart on failure
- SSL certificate auto-renewal