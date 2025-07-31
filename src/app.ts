import app from '@/config/express';
import config from '@/config/config';

import routes from '@/routes';
import { sequelize } from '@/config/connection';

async function main() {
  try {
    await sequelize.authenticate();

    app.use(routes);
    app.listen(config.PORT, () => {
      console.log(`✅ Server running on port: ${config.PORT}`);
    });
  } catch (error) {
    console.error('💥 Failed to start the server', error);
    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}

const handleServerShutdown = async () => {
  try {
    console.log('🚫 Server SHUTDOWN');
    process.exit(0);
  } catch (error) {
    console.log('💥 Error during server shutdown:', error);
  }
};

main();

// Shutdown by kill command
process.on('SIGTERM', handleServerShutdown);
// Shutdown by Ctrl+C
process.on('SIGINT', handleServerShutdown);
