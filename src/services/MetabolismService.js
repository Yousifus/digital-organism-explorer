import lmStudioService from './LMStudioClient';

class MetabolismService {
  constructor() {
    this.isMonitoring = false;
    this.metrics = {
      // Token consumption
      tokenRate: 0,
      totalTokensConsumed: 0,
      tokenEfficiency: 0,
      
      // Resource usage
      cpuUsage: 0,
      gpuUsage: 0,
      memoryUsage: 0,
      vramUsage: 0,
      
      // Performance metrics
      inferenceSpeed: 0,
      latency: 0,
      throughput: 0,
      
      // Temperature and power
      cpuTemperature: 0,
      gpuTemperature: 0,
      powerConsumption: 0,
      
      // Health indicators
      metabolicState: 'resting', // resting, active, intensive, stressed
      efficiency: 0,
      stability: 0,
      
      // Historical data
      history: [],
      lastUpdate: new Date()
    };
    
    this.thresholds = {
      cpu: { normal: 70, high: 85, critical: 95 },
      gpu: { normal: 75, high: 88, critical: 95 },
      memory: { normal: 80, high: 90, critical: 95 },
      temperature: { normal: 75, high: 85, critical: 90 },
      tokenRate: { low: 20, normal: 50, high: 80, critical: 100 }
    };
    
    this.listeners = new Set();
    this.monitoringInterval = null;
    this.performanceHistory = [];
    this.maxHistoryLength = 100;
    
    // Start monitoring if LM Studio is connected
    this.startMonitoring();
  }

  // Core monitoring functions
  startMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.monitoringInterval = setInterval(() => {
      this.updateMetrics();
    }, 1500); // Update every 1.5 seconds
    
    console.log('🔥 Metabolism monitoring started');
  }

  stopMonitoring() {
    if (!this.isMonitoring) return;
    
    this.isMonitoring = false;
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    
    console.log('💤 Metabolism monitoring stopped');
  }

  async updateMetrics() {
    try {
      // Get real metrics from LM Studio if connected
      if (lmStudioService.isConnected) {
        await this.updateRealMetrics();
      } else {
        this.updateSimulatedMetrics();
      }
      
      // Calculate derived metrics
      this.calculateDerivedMetrics();
      
      // Update metabolic state
      this.updateMetabolicState();
      
      // Store in history
      this.addToHistory();
      
      // Notify listeners
      this.notifyListeners();
      
    } catch (error) {
      console.error('Failed to update metabolism metrics:', error);
    }
  }

  async updateRealMetrics() {
    // TODO: Implement real LM Studio API calls for metrics
    // For now, simulate with realistic variations based on actual usage
    
    const baseMetrics = await this.getRealSystemMetrics();
    
    // Token consumption (from actual LM Studio usage)
    this.metrics.tokenRate = this.calculateTokenRate();
    this.metrics.totalTokensConsumed += this.metrics.tokenRate * 1.5; // 1.5 second intervals
    
    // Resource usage (real system metrics)
    this.metrics.cpuUsage = baseMetrics.cpu;
    this.metrics.gpuUsage = baseMetrics.gpu;
    this.metrics.memoryUsage = baseMetrics.memory;
    this.metrics.vramUsage = baseMetrics.vram;
    
    // Performance metrics
    this.metrics.inferenceSpeed = baseMetrics.inferenceSpeed;
    this.metrics.latency = baseMetrics.latency;
    this.metrics.throughput = this.metrics.tokenRate;
    
    // Temperature and power
    this.metrics.cpuTemperature = baseMetrics.cpuTemp;
    this.metrics.gpuTemperature = baseMetrics.gpuTemp;
    this.metrics.powerConsumption = baseMetrics.power;
  }

  async getRealSystemMetrics() {
    // Simulate real system metrics with realistic variations
    // In production, this would call actual system APIs
    
    const time = Date.now() / 1000;
    const variation = Math.sin(time * 0.1) * 0.1 + Math.random() * 0.2;
    
    return {
      cpu: Math.max(20, Math.min(95, 45 + variation * 30)),
      gpu: Math.max(30, Math.min(90, 55 + variation * 25)),
      memory: Math.max(40, Math.min(85, 60 + variation * 20)),
      vram: Math.max(50, Math.min(95, 70 + variation * 15)),
      inferenceSpeed: Math.max(10, Math.min(100, 35 + variation * 20)),
      latency: Math.max(50, Math.min(500, 150 + variation * 100)),
      cpuTemp: Math.max(45, Math.min(85, 65 + variation * 15)),
      gpuTemp: Math.max(50, Math.min(90, 70 + variation * 12)),
      power: Math.max(200, Math.min(450, 300 + variation * 80))
    };
  }

  calculateTokenRate() {
    // Calculate based on recent LM Studio activity
    const recentActivity = this.getRecentActivity();
    if (recentActivity.length === 0) return 0;
    
    const totalTokens = recentActivity.reduce((sum, activity) => sum + (activity.tokens || 0), 0);
    const timeSpan = Math.max(1, recentActivity.length * 1.5); // 1.5 second intervals
    
    return Math.round(totalTokens / timeSpan);
  }

  getRecentActivity() {
    // Get recent activity from memory service or LM Studio
    // For now, simulate based on current state
    const now = Date.now();
    return this.performanceHistory
      .filter(entry => now - entry.timestamp < 30000) // Last 30 seconds
      .map(entry => ({ tokens: entry.tokenRate * 1.5, timestamp: entry.timestamp }));
  }

  updateSimulatedMetrics() {
    // Simulate realistic metrics when not connected to LM Studio
    const time = Date.now() / 1000;
    const baseVariation = Math.sin(time * 0.05) * 0.3 + Math.random() * 0.4;
    
    // Simulate different metabolic states
    const stateMultiplier = this.getStateMultiplier();
    
    this.metrics.tokenRate = Math.max(0, Math.round(25 + baseVariation * 30 * stateMultiplier));
    this.metrics.totalTokensConsumed += this.metrics.tokenRate * 1.5;
    
    this.metrics.cpuUsage = Math.max(15, Math.min(95, 40 + baseVariation * 35 * stateMultiplier));
    this.metrics.gpuUsage = Math.max(20, Math.min(90, 50 + baseVariation * 30 * stateMultiplier));
    this.metrics.memoryUsage = Math.max(30, Math.min(85, 55 + baseVariation * 25));
    this.metrics.vramUsage = Math.max(40, Math.min(95, 65 + baseVariation * 20 * stateMultiplier));
    
    this.metrics.inferenceSpeed = Math.max(5, Math.round(30 + baseVariation * 25 * stateMultiplier));
    this.metrics.latency = Math.max(50, Math.round(200 - baseVariation * 100 * stateMultiplier));
    this.metrics.throughput = this.metrics.tokenRate;
    
    this.metrics.cpuTemperature = Math.max(40, Math.min(85, 60 + baseVariation * 20 * stateMultiplier));
    this.metrics.gpuTemperature = Math.max(45, Math.min(90, 65 + baseVariation * 18 * stateMultiplier));
    this.metrics.powerConsumption = Math.max(150, Math.round(250 + baseVariation * 120 * stateMultiplier));
  }

  getStateMultiplier() {
    switch (this.metrics.metabolicState) {
      case 'resting': return 0.6;
      case 'active': return 1.0;
      case 'intensive': return 1.4;
      case 'stressed': return 1.8;
      default: return 1.0;
    }
  }

  calculateDerivedMetrics() {
    // Token efficiency (tokens per watt)
    this.metrics.tokenEfficiency = this.metrics.powerConsumption > 0 ? 
      Math.round((this.metrics.tokenRate / this.metrics.powerConsumption) * 1000) / 1000 : 0;
    
    // Overall efficiency (0-100%)
    const cpuEff = Math.max(0, 100 - this.metrics.cpuUsage);
    const tempEff = Math.max(0, 100 - (this.metrics.cpuTemperature / 85 * 100));
    const powerEff = Math.max(0, 100 - (this.metrics.powerConsumption / 400 * 100));
    this.metrics.efficiency = Math.round((cpuEff + tempEff + powerEff) / 3);
    
    // System stability (based on variance in recent metrics)
    this.metrics.stability = this.calculateStability();
    
    this.metrics.lastUpdate = new Date();
  }

  calculateStability() {
    if (this.performanceHistory.length < 5) return 95;
    
    const recent = this.performanceHistory.slice(-10);
    const cpuVariance = this.calculateVariance(recent.map(h => h.cpuUsage));
    const tempVariance = this.calculateVariance(recent.map(h => h.cpuTemperature));
    
    // Lower variance = higher stability
    const stabilityScore = Math.max(0, 100 - (cpuVariance + tempVariance) * 2);
    return Math.round(stabilityScore);
  }

  calculateVariance(values) {
    if (values.length === 0) return 0;
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }

  updateMetabolicState() {
    const cpu = this.metrics.cpuUsage;
    const gpu = this.metrics.gpuUsage;
    const temp = Math.max(this.metrics.cpuTemperature, this.metrics.gpuTemperature);
    const tokens = this.metrics.tokenRate;
    
    // Determine metabolic state based on resource usage
    if (cpu > 85 || gpu > 85 || temp > 85 || tokens > 80) {
      this.metrics.metabolicState = 'stressed';
    } else if (cpu > 70 || gpu > 70 || temp > 75 || tokens > 60) {
      this.metrics.metabolicState = 'intensive';
    } else if (cpu > 40 || gpu > 40 || tokens > 20) {
      this.metrics.metabolicState = 'active';
    } else {
      this.metrics.metabolicState = 'resting';
    }
  }

  addToHistory() {
    const snapshot = {
      timestamp: Date.now(),
      tokenRate: this.metrics.tokenRate,
      cpuUsage: this.metrics.cpuUsage,
      gpuUsage: this.metrics.gpuUsage,
      memoryUsage: this.metrics.memoryUsage,
      cpuTemperature: this.metrics.cpuTemperature,
      gpuTemperature: this.metrics.gpuTemperature,
      powerConsumption: this.metrics.powerConsumption,
      metabolicState: this.metrics.metabolicState,
      efficiency: this.metrics.efficiency,
      stability: this.metrics.stability
    };
    
    this.performanceHistory.push(snapshot);
    
    // Keep history size manageable
    if (this.performanceHistory.length > this.maxHistoryLength) {
      this.performanceHistory.shift();
    }
    
    // Also add to metrics history for display
    this.metrics.history = this.performanceHistory.slice(-20); // Last 20 entries for charts
  }

  // Performance optimization
  optimizePerformance() {
    const recommendations = [];
    
    // CPU optimization
    if (this.metrics.cpuUsage > this.thresholds.cpu.high) {
      recommendations.push({
        type: 'cpu',
        severity: 'high',
        message: 'High CPU usage detected. Consider reducing model complexity or batch size.',
        action: 'reduce_load'
      });
    }
    
    // GPU optimization
    if (this.metrics.gpuUsage > this.thresholds.gpu.high) {
      recommendations.push({
        type: 'gpu',
        severity: 'high',
        message: 'High GPU usage detected. Consider optimizing model parameters.',
        action: 'optimize_gpu'
      });
    }
    
    // Temperature management
    if (this.metrics.cpuTemperature > this.thresholds.temperature.high) {
      recommendations.push({
        type: 'temperature',
        severity: 'critical',
        message: 'High temperature detected. Reducing performance to prevent overheating.',
        action: 'thermal_throttle'
      });
    }
    
    // Memory optimization
    if (this.metrics.memoryUsage > this.thresholds.memory.high) {
      recommendations.push({
        type: 'memory',
        severity: 'medium',
        message: 'High memory usage. Consider clearing unused model weights.',
        action: 'clear_memory'
      });
    }
    
    return recommendations;
  }

  // Adaptive load balancing
  adaptiveLoadBalance() {
    const currentLoad = (this.metrics.cpuUsage + this.metrics.gpuUsage) / 2;
    const targetLoad = 70; // Target 70% utilization
    
    if (currentLoad > targetLoad + 10) {
      return {
        action: 'reduce_load',
        factor: 0.8,
        reason: 'High system load detected'
      };
    } else if (currentLoad < targetLoad - 20) {
      return {
        action: 'increase_load',
        factor: 1.2,
        reason: 'System underutilized'
      };
    }
    
    return {
      action: 'maintain',
      factor: 1.0,
      reason: 'Optimal load balance'
    };
  }

  // Health assessment
  getHealthAssessment() {
    const issues = [];
    const warnings = [];
    
    // Critical issues
    if (this.metrics.cpuTemperature > this.thresholds.temperature.critical) {
      issues.push('Critical CPU temperature');
    }
    if (this.metrics.gpuTemperature > this.thresholds.temperature.critical) {
      issues.push('Critical GPU temperature');
    }
    if (this.metrics.cpuUsage > this.thresholds.cpu.critical) {
      issues.push('CPU overload');
    }
    
    // Warnings
    if (this.metrics.efficiency < 50) {
      warnings.push('Low system efficiency');
    }
    if (this.metrics.stability < 70) {
      warnings.push('System instability detected');
    }
    if (this.metrics.tokenEfficiency < 0.1) {
      warnings.push('Poor token efficiency');
    }
    
    const overallHealth = this.calculateOverallHealth();
    
    return {
      status: issues.length > 0 ? 'critical' : warnings.length > 0 ? 'warning' : 'healthy',
      score: overallHealth,
      issues,
      warnings,
      recommendations: this.optimizePerformance()
    };
  }

  calculateOverallHealth() {
    const factors = [
      Math.max(0, 100 - this.metrics.cpuUsage),
      Math.max(0, 100 - this.metrics.gpuUsage),
      Math.max(0, 100 - (this.metrics.cpuTemperature / 85 * 100)),
      this.metrics.efficiency,
      this.metrics.stability
    ];
    
    return Math.round(factors.reduce((sum, factor) => sum + factor, 0) / factors.length);
  }

  // Metabolic state management
  setMetabolicTarget(targetState) {
    const targets = {
      resting: { cpu: 30, gpu: 20, tokens: 10 },
      active: { cpu: 60, gpu: 50, tokens: 40 },
      intensive: { cpu: 80, gpu: 75, tokens: 70 },
      performance: { cpu: 90, gpu: 85, tokens: 90 }
    };
    
    const target = targets[targetState];
    if (!target) return false;
    
    // TODO: Implement actual system adjustments
    console.log(`🎯 Setting metabolic target: ${targetState}`, target);
    return true;
  }

  // Statistics and reporting
  getMetrics() {
    return {
      ...this.metrics,
      health: this.getHealthAssessment(),
      optimization: this.adaptiveLoadBalance(),
      isMonitoring: this.isMonitoring
    };
  }

  getPerformanceReport() {
    const recent = this.performanceHistory.slice(-20);
    if (recent.length === 0) return null;
    
    return {
      averageTokenRate: Math.round(recent.reduce((sum, h) => sum + h.tokenRate, 0) / recent.length),
      averageCpuUsage: Math.round(recent.reduce((sum, h) => sum + h.cpuUsage, 0) / recent.length),
      averageTemperature: Math.round(recent.reduce((sum, h) => sum + h.cpuTemperature, 0) / recent.length),
      peakPerformance: Math.max(...recent.map(h => h.tokenRate)),
      efficiency: this.metrics.efficiency,
      stability: this.metrics.stability,
      uptime: this.isMonitoring ? Date.now() - (recent[0]?.timestamp || Date.now()) : 0
    };
  }

  // Event listeners
  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    const metrics = this.getMetrics();
    this.listeners.forEach(callback => {
      try {
        callback(metrics);
      } catch (error) {
        console.error('Metabolism listener error:', error);
      }
    });
  }

  // Lifecycle management
  destroy() {
    this.stopMonitoring();
    this.listeners.clear();
    this.performanceHistory = [];
  }
}

// Create singleton instance
const metabolismService = new MetabolismService();

export default metabolismService;

