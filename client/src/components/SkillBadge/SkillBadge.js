import React from 'react';

const SkillBadge = ({ skill, showProficiency = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const iconTextSizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl'
  };

  const iconImageSizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  // Default icon based on skill name if no icon provided
  const getDefaultIcon = (skillName) => {
    const name = skillName.toLowerCase();

    // You can extend this mapping or use actual icon URLs
    const iconMap = {
      react: '⚛️',
      javascript: '🟨',
      typescript: '🔷',
      nodejs: '🟢',
      'node.js': '🟢',
      mongodb: '🍃',
      express: '🚀',
      css: '🎨',
      html: '📄',
      python: '🐍',
      java: '☕',
      git: '📂',
      docker: '🐳',
      aws: '☁️',
      azure: '☁️',
      mysql: '🗄️',
      postgresql: '🐘',
      redis: '🔴',
      vue: '💚',
      angular: '🔴',
      php: '🐘',
      laravel: '🎵',
      django: '🐍',
      flask: '🍶',
      graphql: '💜',
      rest: '🌐',
      api: '🔌'
    };

    return iconMap[name] || '💻';
  };

  const proficiencyColor = (proficiency) => {
    if (proficiency >= 90) return 'text-success-600';
    if (proficiency >= 75) return 'text-primary-600';
    if (proficiency >= 60) return 'text-warning-600';
    return 'text-secondary-600';
  };

  return (
    <div
      className={`glass-card ${sizeClasses[size]} text-center group hover:-translate-y-1.5 transition-all duration-300 border border-slate-200/80 hover:border-primary-500/30 hover:shadow-xl hover:shadow-primary-500/10`}
    >
      {/* Skill Icon */}
      <div className="flex justify-center mb-3">
        {skill.icon && skill.icon.startsWith('http') ? (
          <img
            src={skill.icon}
            alt={skill.name}
            className={`${iconImageSizes[size]} object-contain group-hover:scale-115 transition-transform duration-300 drop-shadow-sm`}
          />
        ) : (
          <div
            className={`${iconTextSizes[size]} group-hover:scale-115 transition-transform duration-300 drop-shadow-sm`}
          >
            {skill.icon || getDefaultIcon(skill.name)}
          </div>
        )}
      </div>

      {/* Skill Name */}
      <h3
        className={`font-bold text-slate-900 mb-2 ${textSizes[size]} group-hover:text-primary-600 transition-colors tracking-tight`}
      >
        {skill.name}
      </h3>

      {/* Proficiency Level */}
      {showProficiency && skill.proficiency && (
        <div className="space-y-2 mt-1">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-500 uppercase tracking-wider">Proficiency</span>
            <span
              className={`font-extrabold ${proficiencyColor(skill.proficiency)}`}
            >
              {skill.proficiency}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${
                skill.proficiency >= 90
                  ? 'from-emerald-500 to-teal-400'
                  : skill.proficiency >= 75
                    ? 'from-primary-600 to-indigo-500'
                    : skill.proficiency >= 60
                      ? 'from-amber-500 to-yellow-400'
                      : 'from-slate-500 to-slate-400'
              }`}
              style={{ width: `${skill.proficiency}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Years of Experience */}
      {skill.yearsOfExperience && (
        <div className="mt-2 text-xs font-medium text-slate-500">
          {skill.yearsOfExperience} year
          {skill.yearsOfExperience !== 1 ? 's' : ''} exp.
        </div>
      )}

      {/* Core Skill Badge */}
      {skill.isCore && (
        <div className="mt-2.5">
          <span className="badge badge-primary text-[10px] uppercase tracking-wider font-bold">Core Skill</span>
        </div>
      )}
    </div>
  );
};

export default SkillBadge;
